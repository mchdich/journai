import type { JournalEntry, AIEntryAnalysis, UserAIProfile, MoodHistory, DashboardData } from '@/lib/types/database';

// ============================================
// DEMO JOURNAL ENTRIES
// ============================================
export const demoEntries: JournalEntry[] = [
    {
        id: 'demo-1',
        user_id: 'demo-user',
        title: 'Starting a New Chapter',
        content: `Today marks the beginning of something new. I finally decided to leave my comfort zone and apply for that senior developer position at the startup. The interview process is intimidating, but I feel a strange sense of calm about it.\n\nI've been preparing for weeks — reviewing system design, practicing algorithms, and most importantly, reflecting on what I actually want from my career. It's not just about the title or the money. I want to build things that matter.\n\nHad coffee with Sarah today. She reminded me that growth always feels uncomfortable at first. She's right. I need to trust the process.`,
        created_at: getDateStr(-1),
        updated_at: getDateStr(-1),
        mood_score: 72,
        ai_summary: 'Feeling cautiously optimistic about a career transition. Drawing strength from social connections.',
        ai_tags: ['career', 'growth', 'social', 'optimism'],
    },
    {
        id: 'demo-2',
        user_id: 'demo-user',
        title: 'The Interview Went Well!',
        content: `I can't believe it — the technical interview actually went really well! They asked about distributed systems and I nailed the whiteboard design. The team seems incredible, genuinely passionate people who care about their craft.\n\nThe hiring manager mentioned they're building an AI-powered analytics platform. That's exactly the kind of work I've been dreaming about. I tried not to get too excited, but honestly, I'm buzzing right now.\n\nTreated myself to my favorite ramen spot afterward. Small wins deserve celebration too.`,
        created_at: getDateStr(-3),
        updated_at: getDateStr(-3),
        mood_score: 88,
        ai_summary: 'High energy after a successful interview. Celebrating small achievements.',
        ai_tags: ['career', 'achievement', 'celebration', 'AI'],
    },
    {
        id: 'demo-3',
        user_id: 'demo-user',
        title: 'Anxiety Creeping In',
        content: `Haven't heard back from the company yet. It's only been two days but my mind keeps spiraling. What if I didn't do as well as I thought? What if they chose someone else?\n\nI know this is my anxiety talking. I've been here before. The waiting is always the hardest part.\n\nTried to distract myself with a side project today but couldn't focus. Went for a long walk instead — 8,000 steps by the river. The fresh air helped a little. Need to remember that I can't control the outcome, only my response to it.`,
        created_at: getDateStr(-5),
        updated_at: getDateStr(-5),
        mood_score: 42,
        ai_summary: 'Experiencing anxiety about job application outcome. Using nature and walking as coping mechanisms.',
        ai_tags: ['anxiety', 'waiting', 'coping', 'nature'],
    },
    {
        id: 'demo-4',
        user_id: 'demo-user',
        title: 'Weekend Reset',
        content: `Spent the weekend with family. Mom made her famous biryani and we played board games until midnight. I forgot how much I needed this.\n\nHad a heart-to-heart with my brother about life transitions. He went through something similar last year when he switched from finance to teaching. He said the uncertainty was worth it because he's never been happier.\n\nFeeling grounded again. Whatever happens with the job, I know I have a solid support system. That matters more than any title.`,
        created_at: getDateStr(-7),
        updated_at: getDateStr(-7),
        mood_score: 78,
        ai_summary: 'Family time provided emotional stability. Drawing perspective from loved ones\' experiences.',
        ai_tags: ['family', 'support', 'perspective', 'gratitude'],
    },
    {
        id: 'demo-5',
        user_id: 'demo-user',
        title: 'I Got the Offer! 🎉',
        content: `THEY OFFERED ME THE JOB! Senior Developer at Nexus AI. I'm still in shock. The salary is 20% more than my current role, and they have amazing benefits — unlimited PTO, learning stipend, remote-first.\n\nI called everyone I know. Mom cried (happy tears). Sarah said "I told you so" about a hundred times. Even my cat seemed excited (okay, she was probably just hungry).\n\nThis is proof that betting on yourself pays off. All those late nights studying, all the imposter syndrome, all the self-doubt — it was worth it. I'm going to take a moment to actually feel proud of myself.`,
        created_at: getDateStr(-10),
        updated_at: getDateStr(-10),
        mood_score: 95,
        ai_summary: 'Received dream job offer. Overwhelming joy and validation. Strong social celebration.',
        ai_tags: ['achievement', 'career', 'celebration', 'pride', 'milestone'],
    },
    {
        id: 'demo-6',
        user_id: 'demo-user',
        title: 'First Day Jitters',
        content: `Tomorrow is my first day at the new company. I've laid out my outfit, charged all my devices, and reviewed the onboarding docs three times. Still nervous.\n\nWhat if the team doesn't like me? What if the work is harder than I expected? What if I made a mistake leaving my old job?\n\nDeep breaths. I've handled new beginnings before. I just need to show up, be curious, and be myself. That's always been enough.`,
        created_at: getDateStr(-12),
        updated_at: getDateStr(-12),
        mood_score: 55,
        ai_summary: 'Pre-first-day anxiety mixed with determination. Using self-talk as a coping strategy.',
        ai_tags: ['anxiety', 'new beginnings', 'self-talk', 'career'],
    },
    {
        id: 'demo-7',
        user_id: 'demo-user',
        title: 'Finding My Groove',
        content: `Two weeks into the new role and things are clicking. The codebase is complex but well-architected. My team lead, Marcus, has been incredibly supportive — we pair program every morning and he explains the "why" behind every design decision.\n\nShipped my first feature today: a real-time data pipeline for user analytics. It felt incredible to see it go live. The team celebrated with virtual high-fives.\n\nStarting to feel like I belong here. The imposter syndrome isn't completely gone, but it's getting quieter.`,
        created_at: getDateStr(-16),
        updated_at: getDateStr(-16),
        mood_score: 82,
        ai_summary: 'Settling into new role. First successful contribution. Imposter syndrome gradually fading.',
        ai_tags: ['work', 'achievement', 'team', 'growth', 'belonging'],
    },
    {
        id: 'demo-8',
        user_id: 'demo-user',
        title: 'Burnout Warning Signs',
        content: `Worked until 11 PM three nights in a row. There's a critical launch coming up and I want to prove myself, but I'm starting to feel the toll. Headaches, trouble sleeping, skipped the gym twice this week.\n\nI need to set better boundaries. Being new doesn't mean I have to sacrifice my health. Tomorrow I'm logging off at 6 PM no matter what.\n\nAlso haven't called mom in a week. Adding that to tomorrow's list.`,
        created_at: getDateStr(-20),
        updated_at: getDateStr(-20),
        mood_score: 38,
        ai_summary: 'Recognizing early burnout signs. Acknowledging need for boundaries and self-care.',
        ai_tags: ['burnout', 'work-life balance', 'health', 'boundaries'],
    },
    {
        id: 'demo-9',
        user_id: 'demo-user',
        title: 'Meditation & Morning Routine',
        content: `Started a new morning routine this week: 10 minutes of meditation, journaling, then a short walk before opening my laptop. It's only been 4 days but the difference is remarkable.\n\nI feel more present in meetings, less reactive to Slack messages, and generally calmer throughout the day. Why didn't I start this sooner?\n\nAlso signed up for a pottery class on weekends. Need more things in my life that aren't screens.`,
        created_at: getDateStr(-24),
        updated_at: getDateStr(-24),
        mood_score: 74,
        ai_summary: 'Implementing positive lifestyle changes. Meditation and routine bringing noticeable calm.',
        ai_tags: ['meditation', 'routine', 'wellness', 'hobbies', 'self-improvement'],
    },
    {
        id: 'demo-10',
        user_id: 'demo-user',
        title: 'Gratitude Check',
        content: `Taking a moment to write down things I'm grateful for today:\n\n1. A job that challenges and excites me\n2. Friends who check in without being asked\n3. My health — the gym habit is back on track\n4. This journal — writing helps me process everything\n5. The sunset I caught on my evening walk\n\nSometimes I get so caught up in "what's next" that I forget to appreciate what's here. Life is pretty good right now.`,
        created_at: getDateStr(-28),
        updated_at: getDateStr(-28),
        mood_score: 85,
        ai_summary: 'Reflective gratitude practice. Recognizing and appreciating current blessings.',
        ai_tags: ['gratitude', 'reflection', 'mindfulness', 'positivity'],
    },
    {
        id: 'demo-11',
        user_id: 'demo-user',
        title: 'Difficult Conversation',
        content: `Had to give feedback to a junior developer today about code quality. It was uncomfortable — I remember being in their shoes and how crushing criticism can feel.\n\nI tried my best to be constructive: specific examples, actionable suggestions, and genuine recognition of what they're doing well. They seemed receptive, even thanked me afterward.\n\nLeadership isn't about authority, it's about lifting others up while being honest. Still learning this.`,
        created_at: getDateStr(-32),
        updated_at: getDateStr(-32),
        mood_score: 62,
        ai_summary: 'Navigating leadership challenges. Growing in emotional intelligence and mentorship.',
        ai_tags: ['leadership', 'empathy', 'growth', 'work', 'communication'],
    },
    {
        id: 'demo-12',
        user_id: 'demo-user',
        title: 'Late Night Reflections',
        content: `Can't sleep. Mind is racing about the quarterly planning meeting tomorrow. I have to present my team's roadmap to the VP of Engineering.\n\nPublic speaking has always been my biggest fear. I've prepared extensively — slides are polished, talking points memorized, backup data ready. But the fear doesn't care about preparation.\n\nListening to rain sounds. Writing this is helping calm my thoughts. Tomorrow will come and go. I just need to show up with confidence, even if I have to fake it a little.`,
        created_at: getDateStr(-35),
        updated_at: getDateStr(-35),
        mood_score: 45,
        ai_summary: 'Pre-presentation anxiety. Using journaling and ambient sounds as calming techniques.',
        ai_tags: ['anxiety', 'public speaking', 'preparation', 'self-care'],
    },
];

// ============================================
// DEMO ANALYSES
// ============================================
export const demoAnalyses: AIEntryAnalysis[] = demoEntries.map((entry, i) => ({
    id: `analysis-${i + 1}`,
    entry_id: entry.id,
    mood_score: entry.mood_score!,
    stress_score: Math.max(10, 100 - entry.mood_score! + Math.floor(Math.random() * 20) - 10),
    motivation_score: Math.min(100, entry.mood_score! + Math.floor(Math.random() * 15)),
    confidence_score: Math.min(100, entry.mood_score! - 5 + Math.floor(Math.random() * 20)),
    social_energy_score: 40 + Math.floor(Math.random() * 40),
    detected_topics: entry.ai_tags || [],
    biggest_win: entry.mood_score! > 70
        ? ['Landed dream job', 'Shipped first feature', 'Established morning routine', 'Practiced gratitude', 'Gave constructive feedback'][i % 5]
        : null,
    concerns: entry.mood_score! < 50
        ? ['Managing anxiety', 'Work-life boundaries']
        : null,
    summary: entry.ai_summary!,
    created_at: entry.created_at,
}));

// ============================================
// DEMO MOOD HISTORY
// ============================================
export const demoMoodHistory: MoodHistory[] = Array.from({ length: 90 }, (_, i) => {
    const dayOffset = i;
    const baseScore = 55 + Math.sin(i / 7) * 15 + Math.cos(i / 14) * 10;
    const noise = (Math.random() - 0.5) * 20;
    const score = Math.max(15, Math.min(95, Math.round(baseScore + noise)));

    return {
        id: `mood-${i}`,
        user_id: 'demo-user',
        date: getDateStr(-dayOffset).split('T')[0],
        mood_score: score,
        entry_id: demoEntries[i % demoEntries.length]?.id || null,
    };
});

// ============================================
// DEMO AI PROFILE
// ============================================
export const demoAIProfile: UserAIProfile = {
    user_id: 'demo-user',
    personality_summary:
        'A thoughtful, driven individual navigating a major career transition. Shows high self-awareness and emotional intelligence. Tends toward anxiety in uncertain situations but has strong coping mechanisms — social support, nature, and journaling. Values growth, authenticity, and meaningful work over status.',
    recurring_topics: [
        'Career growth',
        'Imposter syndrome',
        'Work-life balance',
        'Family connections',
        'Self-improvement',
        'Anxiety management',
        'Leadership development',
    ],
    emotional_patterns: [
        'Mood significantly improves after social interactions',
        'Work-related stress tends to peak mid-week',
        'Journaling and meditation help stabilize emotions',
        'Achievement events create lasting positive mood shifts',
        'Anticipatory anxiety before big events, but usually performs well',
    ],
    goals: [
        'Excel in new senior developer role',
        'Maintain healthy work-life boundaries',
        'Develop leadership skills',
        'Build consistent meditation practice',
    ],
    stressors: [
        'Public speaking and presentations',
        'Imposter syndrome in new environments',
        'Tendency to overwork when trying to prove worth',
        'Uncertainty and waiting for outcomes',
    ],
    positive_patterns: [
        'Strong social support network',
        'Regular exercise and outdoor activities',
        'Reflective journaling habit',
        'Celebrating small wins',
        'Seeking perspective from trusted friends and family',
    ],
    updated_at: getDateStr(0),
};

// ============================================
// DEMO DASHBOARD DATA
// ============================================
export function getDemoDashboardData(timeframe: 'week' | 'month' | 'year'): DashboardData {
    const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
    const filteredMoods = demoMoodHistory.filter((_, i) => i < days);
    const avgMood = Math.round(
        filteredMoods.reduce((sum, m) => sum + m.mood_score, 0) / filteredMoods.length
    );

    const recentMoods = filteredMoods.slice(0, Math.ceil(days / 3));
    const olderMoods = filteredMoods.slice(Math.ceil(days / 3));
    const recentAvg = recentMoods.reduce((s, m) => s + m.mood_score, 0) / recentMoods.length;
    const olderAvg = olderMoods.reduce((s, m) => s + m.mood_score, 0) / olderMoods.length;
    const trend: 'up' | 'down' | 'stable' =
        recentAvg - olderAvg > 3 ? 'up' : recentAvg - olderAvg < -3 ? 'down' : 'stable';

    return {
        moodHistory: filteredMoods.reverse(),
        averageMood: avgMood,
        moodTrend: trend,
        biggestWins: [
            'Landed the senior developer position at Nexus AI',
            'Shipped first feature — real-time data pipeline',
            'Established a consistent morning meditation routine',
            'Successfully gave constructive feedback to a team member',
            'Reconnected with family during weekend visit',
        ].slice(0, timeframe === 'week' ? 2 : timeframe === 'month' ? 4 : 5),
        recurringTopics: demoAIProfile.recurring_topics || [],
        emotionalPatterns: demoAIProfile.emotional_patterns || [],
        aiReflection:
            timeframe === 'week'
                ? "This week has been a mix of excitement and adjustment. You're settling into a new rhythm at work, and while there's still some anxiety around proving yourself, your overall trajectory is very positive. Remember to maintain those boundaries you set — they're clearly helping."
                : timeframe === 'month'
                    ? "Over the past month, you've navigated one of the biggest transitions of your career with remarkable resilience. Your mood dipped during the waiting period and first-day nerves, but bounced back strongly. Your support network — especially Sarah and your family — has been instrumental. The morning routine and meditation practice you started are showing measurable improvements in your daily emotional baseline."
                    : "Looking at the past year, there's a clear upward trajectory in your emotional well-being. The career change was a pivotal moment that marked a shift from stagnation to growth. You've developed stronger coping mechanisms, deepened your self-awareness, and built habits that support your mental health. Areas to watch: your tendency to overwork during high-pressure periods, and making sure social connections don't slip during busy phases.",
        totalEntries: demoEntries.length,
        currentStreak: 5,
        longestStreak: 12,
        entryDates: demoEntries.map((e) => e.created_at.split('T')[0]),
        analyses: demoAnalyses.slice(0, timeframe === 'week' ? 3 : timeframe === 'month' ? 8 : 12),
    };
}

// ============================================
// HELPER: relative date string
// ============================================
function getDateStr(daysOffset: number): string {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString();
}
