import { createClient as createServiceSupabase } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { createClient as createServerSupabase } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = (body.title ?? '').toString();
    const content = (body.content ?? '').toString();

    if (!content || !content.trim()) {
      return new Response(JSON.stringify({ error: 'Content is required' }), { status: 400 });
    }

    const supabase = await createServerSupabase();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    // Prevent more than one entry per UTC day
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const { data: existing } = await supabase
      .from('journal_entries')
      .select('id')
      .eq('user_id', user.id)
      .gte('created_at', todayISO)
      .limit(1);

    if (existing && (existing as any).length > 0) {
      return new Response(JSON.stringify({ error: 'Only one entry allowed per day' }), { status: 409 });
    }

    const { data: inserted, error: insertErr } = await supabase
      .from('journal_entries')
      .insert({ user_id: user.id, title, content })
      .select()
      .single();

    if (insertErr) {
      console.error('Insert error', insertErr);
      return new Response(JSON.stringify({ error: insertErr.message }), { status: 500 });
    }

    // Fire-and-forget background analysis using service role key
    void (async () => {
      try {
        const serviceSupabase = createServiceSupabase(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        await processEntryAnalysis(serviceSupabase, (inserted as any).id);
      } catch (e) {
        console.error('Background analysis failed', e);
      }
    })();

    return new Response(JSON.stringify(inserted), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

async function processEntryAnalysis(serviceSupabase: any, entryId: string) {
  // Fetch the entry with service role privileges
  const { data: entryData, error: fetchErr } = await serviceSupabase
    .from('journal_entries')
    .select('*')
    .eq('id', entryId)
    .single();

  if (fetchErr || !entryData) throw new Error('Entry not found for analysis');

  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = buildAnalysisPrompt(entryData.content);

  const completion: any = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an empathetic assistant that analyzes short personal journal entries and returns a strict JSON object.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.15,
    max_tokens: 800,
  });

  const raw = completion?.choices?.[0]?.message?.content ?? completion?.choices?.[0]?.text ?? '';
  const parsed = safeParseJSONFromText(raw);

  // Insert analysis row
  await serviceSupabase.from('ai_entry_analysis').insert({
    entry_id: entryId,
    mood_score: parsed.mood_score ?? 50,
    stress_score: parsed.stress_score ?? 50,
    motivation_score: parsed.motivation_score ?? 50,
    confidence_score: parsed.confidence_score ?? 50,
    social_energy_score: parsed.social_energy_score ?? 50,
    detected_topics: parsed.detected_topics ?? [],
    biggest_win: parsed.biggest_win ?? null,
    concerns: parsed.concerns ?? [],
    summary: parsed.summary ?? '',
  });

  // Update journal entry with compact ai fields
  await serviceSupabase
    .from('journal_entries')
    .update({
      mood_score: parsed.mood_score ?? null,
      ai_summary: parsed.summary ?? null,
      ai_tags: parsed.suggested_tags ?? parsed.detected_topics ?? [],
    })
    .eq('id', entryId);

  // Insert mood history
  const dateStr = new Date(entryData.created_at).toISOString().split('T')[0];
  await serviceSupabase.from('mood_history').insert({
    user_id: entryData.user_id,
    date: dateStr,
    mood_score: parsed.mood_score ?? 50,
    entry_id: entryId,
  });

  // Update user AI profile (merge topics)
  const { data: profile } = await serviceSupabase.from('user_ai_profile').select('*').eq('user_id', entryData.user_id).single();

  const mergedTopics = Array.from(new Set([...(profile?.recurring_topics ?? []), ...(parsed.detected_topics ?? [])]));

  await serviceSupabase.from('user_ai_profile').upsert({
    user_id: entryData.user_id,
    personality_summary: profile?.personality_summary ?? null,
    recurring_topics: mergedTopics,
    emotional_patterns: profile?.emotional_patterns ?? [],
    goals: profile?.goals ?? [],
    stressors: profile?.stressors ?? [],
    positive_patterns: profile?.positive_patterns ?? [],
    updated_at: new Date().toISOString(),
  });
}

function buildAnalysisPrompt(content: string) {
  return `Analyze the following journal entry and return a JSON object ONLY (no explanation) with the following keys:
  - mood_score: integer 1-100 (higher = more positive)
  - stress_score: integer 1-100 (higher = more stressed)
  - motivation_score: integer 1-100
  - confidence_score: integer 1-100
  - social_energy_score: integer 1-100
  - summary: short (1-2 sentences) emotionally-supportive summary
  - biggest_win: single short sentence or null
  - concerns: array of short concern phrases
  - detected_topics: array of short topic tags
  - suggested_tags: array of short tags to save in ai_tags

Entry:\n\n${content}`;
}

function safeParseJSONFromText(text: string) {
  try {
    // Attempt to extract JSON object from the model output
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    const jsonText = firstBrace !== -1 && lastBrace !== -1 ? text.slice(firstBrace, lastBrace + 1) : text;
    return JSON.parse(jsonText);
  } catch (e) {
    console.error('Failed to parse JSON from model output', e, 'raw:', text);
    return {};
  }
}
