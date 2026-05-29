import type { JournalEntry, AIEntryAnalysis, UserAIProfile, MoodHistory, DashboardData } from '@/lib/types/database';

// ============================================
// DEMO ENTRY GENERATOR HELPER
// ============================================
function createFixedDate(dateStr: string): string {
  // Use a fixed year (2026) to match the screenshots, but dynamic enough to look real
  // March 3, 2026 is used as the base
  return new Date(`2026-03-${dateStr}T12:00:00Z`).toISOString();
}

// ============================================
// DEMO JOURNAL ENTRIES
// ============================================
export const demoEntries: JournalEntry[] = [
  {
    id: 'demo-7',
    user_id: 'demo-user',
    title: 'Strange mix of confidence and uncertainty',
    content: `I’ve noticed something lately:

Externally, I probably seem more confident than ever.
Internally, I still feel like I’m improvising most of the time.

Maybe adulthood is just realizing nobody fully knows what they’re doing.

I spent today refining UI animations and transitions for the app. Tiny details honestly make such a massive difference emotionally. A smooth transition can make software feel alive.

There’s still a mountain of work ahead:
* auth
* AI pipelines
* dashboard logic
* performance optimization
* mobile responsiveness

But for once the scope excites me instead of intimidating me.

I think I’m slowly becoming someone who trusts himself more.

Not because I suddenly became fearless —
but because I’ve started realizing I can handle uncertainty better than I used to.`,
    created_at: createFixedDate('20'),
    updated_at: createFixedDate('20'),
    mood_score: 82,
    ai_summary: 'Feeling a blend of internal uncertainty and external confidence. Finding joy and flow in detailed work, and feeling energized rather than daunted by large project scopes. Embracing growth and self-trust.',
    ai_tags: ['confidence', 'growth', 'flow', 'acceptance', 'work'],
  },
  {
    id: 'demo-6',
    user_id: 'demo-user',
    title: 'Feeling optimistic again',
    content: `Something shifted today.

Spent most of the afternoon working on the dashboard concepts for JournAI and for the first time I could actually visualize the product clearly. The emotional timeline feature especially feels powerful. Seeing your own mental patterns visually over time could genuinely help people.

I got into one of those deep creative flow states where hours disappear without noticing. I haven’t felt that level of focus in months.

Honestly, I think meaningful work is one of the biggest contributors to my mental state. Whenever I’m building something I care about, everything else feels quieter.

Also had a long call with my parents tonight. It reminded me I haven’t been making enough time for family recently.

Overall today felt hopeful.

Not because everything is solved, but because the future feels exciting again.`,
    created_at: createFixedDate('16'),
    updated_at: createFixedDate('16'),
    mood_score: 88,
    ai_summary: 'Experienced a significant positive shift in mood driven by a deep creative flow state and meaningful work. Reconnected with family, adding to a general sense of hopefulness and excitement for the future.',
    ai_tags: ['optimism', 'flow', 'purpose', 'family', 'creativity'],
  },
  {
    id: 'demo-5',
    user_id: 'demo-user',
    title: 'Burnout warning signs',
    content: `Today felt off from the moment I woke up.

I couldn’t focus deeply on anything for more than 15 minutes. Even small tasks felt weirdly heavy. I kept opening YouTube or Twitter without thinking, almost like my brain was trying to escape effort automatically.

What worries me most is how normalized this has started to feel.

I think I’ve been consuming way too much information lately and creating too little. There’s this constant low-grade guilt in the background because I know exactly what I should be doing, but I keep diffusing my attention across meaningless things.

The one positive thing today: I forced myself to go outside and run for half an hour. It genuinely improved my mood afterward.

It’s frustrating how often the obvious healthy things actually work.

I need to rebuild some structure before this spirals into full burnout.`,
    created_at: createFixedDate('14'),
    updated_at: createFixedDate('14'),
    mood_score: 35,
    ai_summary: 'Struggling with severe focus issues, brain fog, and avoidance behaviors. Recognizing a dangerous imbalance between consumption and creation, leading to low-grade guilt. Identified exercise as an effective, albeit frustratingly obvious, intervention.',
    ai_tags: ['burnout', 'avoidance', 'guilt', 'exercise', 'awareness'],
  },
  {
    id: 'demo-4',
    user_id: 'demo-user',
    title: 'Mentally noisy',
    content: `My brain has felt overcrowded all day.

Too many tabs open mentally.

I keep jumping between excitement about future ideas and anxiety about whether I’m capable of actually pulling them off. It’s exhausting constantly living between ambition and self-doubt.

The journaling app idea still excites me though. Every time I think about it, it feels meaningful in a way a lot of projects don’t. I think people secretly want to feel understood, especially by themselves.

I spent a few hours researching AI memory systems and personalization pipelines. It’s fascinating how quickly these systems are evolving. At the same time, it makes me nervous because expectations in tech move insanely fast now.

Part of me worries I’m already too late.

Another part of me knows that’s probably fear talking.

I didn’t sleep enough last night and I can feel how much worse everything sounds in my head when I’m tired.`,
    created_at: createFixedDate('11'),
    updated_at: createFixedDate('11'),
    mood_score: 48,
    ai_summary: 'Experiencing mental clutter and exhaustion stemming from the tension between high ambition and self-doubt. Passionate about a new project but dealing with FOMO and performance anxiety, exacerbated by lack of sleep.',
    ai_tags: ['anxiety', 'overwhelm', 'ambition', 'doubt', 'fatigue'],
  },
  {
    id: 'demo-3',
    user_id: 'demo-user',
    title: 'One of those unexpectedly good days',
    content: `Today felt balanced.

Not euphoric. Not life-changing. Just… healthy.

I woke up early naturally, made coffee, cleaned the apartment, and spent a few hours coding without constantly checking my phone. That alone felt like a miracle.

The biggest win today was finally launching the small side project landing page I’ve been sitting on forever. It’s nowhere near perfect, but at least it exists now. I’ve spent too much time hiding unfinished work from the world.

I also realized I’m becoming more comfortable with imperfection lately. Or at least I’m trying to.

In the evening I went to the gym and actually had a really good session. My energy has been noticeably better whenever I maintain a routine consistently. Sleep still needs work though.

There’s something satisfying about days where nothing dramatic happens but you still end the day proud of yourself.`,
    created_at: createFixedDate('08'),
    updated_at: createFixedDate('08'),
    mood_score: 76,
    ai_summary: 'A balanced, healthy, and highly productive day characterized by deep focus and overcoming perfectionism to launch a project. Consistent routines (cleaning, exercise) contributed directly to sustained energy and quiet pride.',
    ai_tags: ['balance', 'focus', 'achievement', 'routine', 'acceptance'],
  },
  {
    id: 'demo-2',
    user_id: 'demo-user',
    title: 'Good conversations fix more than I expect',
    content: `Tonight reminded me how much better I feel after spending time with people I actually care about.

Met up with Sam and Lina for dinner after work. I almost cancelled because I was tired, but I’m really glad I didn’t. We ended up talking for almost three hours about careers, relationships, getting older, and how weird it feels trying to figure life out while pretending you already know what you’re doing.

There was one moment where everyone just started laughing uncontrollably over something stupid and I realized I haven’t genuinely laughed like that in weeks.

I’ve noticed that when I isolate myself too long, my thoughts become way heavier than they really are. Everything feels more solvable after a good conversation.

Work itself was stressful today though. Too many meetings, too many Slack notifications, too many tiny tasks fragmenting my attention. I miss having uninterrupted focus.

But emotionally I feel lighter tonight than I have in a while.`,
    created_at: createFixedDate('05'),
    updated_at: createFixedDate('05'),
    mood_score: 80,
    ai_summary: 'Experienced a profound mood lift through deep, authentic social connection and shared laughter, counteracting the heavy thoughts caused by isolation. This social recharge successfully mitigated the effects of a stressful, fragmented workday.',
    ai_tags: ['connection', 'relief', 'stress', 'friendship', 'perspective'],
  },
  {
    id: 'demo-1',
    user_id: 'demo-user',
    title: 'Trying to regain momentum',
    content: `I woke up already feeling behind today.

Nothing catastrophic happened, but I’ve been stuck in this weird cycle where I keep planning productive weeks and then losing steam halfway through them. I spent most of the morning reorganizing my workspace instead of actually doing the work I needed to do. It felt productive in the moment, but honestly it was probably avoidance.

Later in the afternoon I finally sat down and made progress on the design project I’ve been procrastinating on for weeks. Once I actually started, it wasn’t nearly as bad as I imagined. Funny how that always happens.

I also went on a walk around sunset without headphones. I haven’t done that in a while. It felt surprisingly calming just hearing normal city sounds again instead of constantly feeding my brain more content.

I think what’s bothering me lately is this feeling that everyone else is accelerating while I’m standing still. Rationally I know social media distorts reality, but emotionally it still gets to me.

Still, today wasn’t bad. I moved forward a little.

And maybe lately “a little” is enough.`,
    created_at: createFixedDate('03'),
    updated_at: createFixedDate('03'),
    mood_score: 60,
    ai_summary: 'Navigating feelings of stagnation, social comparison, and procrastination. Successfully broke the cycle by starting a delayed project and seeking sensory calm through an unconnected walk. Practicing self-compassion regarding productivity.',
    ai_tags: ['procrastination', 'comparison', 'progress', 'mindfulness', 'compassion'],
  },
];

// ============================================
// DEMO ANALYSES
// ============================================
export const demoAnalyses: AIEntryAnalysis[] = demoEntries.map((entry, i) => {
  // Slightly adjust scores based on the content of the entries
  let stress = 50;
  let motivation = 50;
  let confidence = 50;
  let social = 50;
  let biggest_win = null;
  let concerns = null;

  if (entry.id === 'demo-7') {
    stress = 30; motivation = 85; confidence = 75; social = 40;
    biggest_win = 'Finding flow in UI design, embracing uncertainty';
  } else if (entry.id === 'demo-6') {
    stress = 20; motivation = 90; confidence = 80; social = 70;
    biggest_win = 'Visualizing the product clearly; deep creative flow';
  } else if (entry.id === 'demo-5') {
    stress = 80; motivation = 20; confidence = 30; social = 20;
    concerns = ['Extreme burnout signs', 'Information overload', 'Avoidance'];
  } else if (entry.id === 'demo-4') {
    stress = 75; motivation = 60; confidence = 40; social = 30;
    concerns = ['Overwhelm', 'Self-doubt vs Ambition tension', 'Poor sleep'];
  } else if (entry.id === 'demo-3') {
    stress = 25; motivation = 75; confidence = 70; social = 30;
    biggest_win = 'Launched side project landing page';
  } else if (entry.id === 'demo-2') {
    stress = 60; motivation = 50; confidence = 65; social = 95;
    biggest_win = 'Deep social connection and laughter with Sam & Lina';
  } else if (entry.id === 'demo-1') {
    stress = 50; motivation = 40; confidence = 45; social = 30;
    biggest_win = 'Broke procrastination cycle to work on design project';
    concerns = ['Feelings of stagnation', 'Social comparison'];
  }

  return {
    id: `analysis-${entry.id}`,
    entry_id: entry.id,
    mood_score: entry.mood_score!,
    stress_score: stress,
    motivation_score: motivation,
    confidence_score: confidence,
    social_energy_score: social,
    detected_topics: entry.ai_tags || [],
    biggest_win,
    concerns: concerns ? concerns : [],
    summary: entry.ai_summary!,
    created_at: entry.created_at,
  };
});

// ============================================
// DEMO MOOD HISTORY
// ============================================
// Create a 365-day mood history for the heatmap and charts
export const demoMoodHistory: MoodHistory[] = Array.from({ length: 365 }, (_, i) => {
  const d = new Date('2026-03-24T12:00:00Z');
  d.setDate(d.getDate() - i);
  const dateStr = d.toISOString().split('T')[0];

  // Try to find if we have a real entry for this date
  const entryForDate = demoEntries.find(e => e.created_at.startsWith(dateStr));

  if (entryForDate) {
    return {
      id: `mood-${i}`,
      user_id: 'demo-user',
      date: dateStr,
      mood_score: entryForDate.mood_score!,
      entry_id: entryForDate.id,
    };
  }

  // Generate realistic background noise that trends generally upward over the year
  // but has periodic dips and peaks
  const progressThroughYear = (365 - i) / 365; // 0 (past) to 1 (present)
  const baseScore = 55 + (progressThroughYear * 15); // ranges ~55 to 70

  // Add some weekly/monthly periodicity
  const weeklyCycle = Math.sin(i / 7 * Math.PI * 2) * 8;
  const monthlyCycle = Math.cos(i / 30 * Math.PI * 2) * 12;

  // Add random noise
  const noise = (Math.random() - 0.5) * 15;

  // Calculate final score and clamp between 15 and 95
  const score = Math.max(15, Math.min(95, Math.round(baseScore + weeklyCycle + monthlyCycle + noise)));

  // Randomly drop some days to simulate missed journal entries (heatmap gaps)
  // Let's say user journals ~60% of the time, getting more consistent lately
  const probabilityOfEntry = 0.4 + (progressThroughYear * 0.4);
  if (Math.random() > probabilityOfEntry) {
    return null as any; // Filtered out below
  }

  return {
    id: `mood-${i}`,
    user_id: 'demo-user',
    date: dateStr,
    mood_score: score,
    entry_id: null,
  };
}).filter(Boolean); // Remove the nulls representing missed days

// ============================================
// DEMO AI PROFILE
// ============================================
export const demoAIProfile: UserAIProfile = {
  user_id: 'demo-user',
  personality_summary:
    'A deeply introspective and ambitious creative builder. Experiences a constant tension between high ambitions for side projects (like a journaling app) and struggles with self-doubt, comparison, and focus. Thrives deeply in creative "flow states" and derives immense stability from quiet routines (walking without headphones, cleaning, consistent exercise). While prone to isolation during stressful periods, genuine social connection acts as an immediate and powerful antidote to their mental heaviness.',
  recurring_topics: [
    'Creative projects and building',
    'Productivity guilt vs avoidance',
    'The impact of social media comparison',
    'The necessity of unplugged routines (nature, exercise)',
    'Balancing ambition with burnout risk',
  ],
  emotional_patterns: [
    'Mood drops precipitously when consuming too much content vs creating',
    'Experiences "mental noise" and anxiety from lack of sleep + high ambition',
    'Meaningful social interaction immediately re-regulates stress levels',
    'Flow states significantly boost both mood and confidence for prolonged periods',
    'Tends to feel behind others, driving both progress and anxiety',
  ],
  goals: [
    'Launch and refine the journaling app (JournAI)',
    'Establish consistent routines to prevent burnout spirals',
    'Get more comfortable with imperfection and shipping early',
    'Maintain a healthier information diet (create > consume)',
  ],
  stressors: [
    'Information overload and excessive screen time',
    'Comparing own progress to others (especially via social media)',
    'Lack of sleep compounding self-doubt',
    'The gap between project ambition and current execution',
  ],
  positive_patterns: [
    'Walking outside without headphones or inputs',
    'Deep conversations with trusted friends (Sam & Lina)',
    'Getting into deep coding/design flow states',
    'Recognizing and celebrating small wins',
  ],
  updated_at: createFixedDate('20'),
};

// ============================================
// DEMO DASHBOARD DATA
// ============================================
export function getDemoDashboardData(timeframe: 'week' | 'month' | 'year'): DashboardData {
  const latestDate = new Date('2026-03-24T12:00:00Z');

  let cutoffDate = new Date(latestDate);
  if (timeframe === 'week') cutoffDate.setDate(latestDate.getDate() - 7);
  else if (timeframe === 'month') cutoffDate.setDate(latestDate.getDate() - 30);
  else cutoffDate.setDate(latestDate.getDate() - 365);

  const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

  const filteredMoods = demoMoodHistory.filter(m => m.date >= cutoffDateStr).sort((a, b) => a.date.localeCompare(b.date));

  const avgMood = filteredMoods.length > 0
    ? Math.round(filteredMoods.reduce((sum, m) => sum + m.mood_score, 0) / filteredMoods.length)
    : 0;

  // Calculate trend by comparing the most recent third to the older two-thirds
  const recentCount = Math.max(1, Math.floor(filteredMoods.length / 3));
  const recentMoods = filteredMoods.slice(-recentCount);
  const olderMoods = filteredMoods.slice(0, -recentCount);

  const recentAvg = recentMoods.length ? recentMoods.reduce((s, m) => s + m.mood_score, 0) / recentMoods.length : avgMood;
  const olderAvg = olderMoods.length ? olderMoods.reduce((s, m) => s + m.mood_score, 0) / olderMoods.length : avgMood;

  const trend: 'up' | 'down' | 'stable' =
    recentAvg - olderAvg > 5 ? 'up' : recentAvg - olderAvg < -5 ? 'down' : 'stable';

  const allDetectedWins = demoAnalyses.map(a => a.biggest_win).filter(Boolean) as string[];

  // Filter analyses to the right timeframe
  const filteredAnalyses = demoAnalyses.filter(a => a.created_at.split('T')[0] >= cutoffDateStr);

  return {
    moodHistory: filteredMoods,
    averageMood: avgMood,
    moodTrend: trend,
    biggestWins: [
      'Visualizing JournAI clearly; entering deep creative flow',
      'Launched side project landing page',
      'Overcame procrastination to advance design project',
      'Recognized burnout signs and implemented immediate course correction',
    ].slice(0, timeframe === 'week' ? 2 : timeframe === 'month' ? 4 : 5),
    recurringTopics: demoAIProfile.recurring_topics || [],
    emotionalPatterns: demoAIProfile.emotional_patterns || [],
    aiReflection:
      timeframe === 'week'
        ? "This past week has seen a powerful upward swing. You moved from the heavy brain fog and burnout warnings into a highly productive, deeply satisfying flow state while working on JournAI. Trusting yourself and embracing uncertainty is paying off quickly."
        : timeframe === 'month'
          ? "March has been a month of profound self-awareness. You oscillated between periods of high ambition/anxiety and periods of burnout avoidance. However, you consistently deployed effective interventions: going outside, connecting with Sam and Lina, and leaning into meaningful work. The launch of your side project and recent flow states mark a significant positive turning point."
          : "Looking back over the year, there's a clear narrative of growth. You're learning your own operating manual. Times of isolation and high consumption reliably lead to mental noise and anxiety. Conversely, when you prioritize authentic social connection, tactile routines, and focused creation, both your mood and confidence soar. You're becoming much better at catching the downward spirals before they take root.",
    totalEntries: demoEntries.length,
    currentStreak: 4,
    longestStreak: 21,
    entryDates: demoMoodHistory.map((m) => m.date),
    analyses: filteredAnalyses,
  };
}
