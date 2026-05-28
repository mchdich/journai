export interface Profile {
  id: string;
  email: string;
  created_at: string;
  display_name: string | null;
  avatar_url: string | null;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  mood_score: number | null;
  ai_summary: string | null;
  ai_tags: string[] | null;
}

export interface UserAIProfile {
  user_id: string;
  personality_summary: string | null;
  recurring_topics: string[] | null;
  emotional_patterns: string[] | null;
  goals: string[] | null;
  stressors: string[] | null;
  positive_patterns: string[] | null;
  updated_at: string;
}

export interface AIEntryAnalysis {
  id: string;
  entry_id: string;
  mood_score: number;
  stress_score: number;
  motivation_score: number;
  confidence_score: number;
  social_energy_score: number;
  detected_topics: string[];
  biggest_win: string | null;
  concerns: string[] | null;
  summary: string;
  created_at: string;
}

export interface MoodHistory {
  id: string;
  user_id: string;
  date: string;
  mood_score: number;
  entry_id: string | null;
}

// Dashboard types
export type TimeFrame = 'week' | 'month' | 'year';

export interface DashboardData {
  moodHistory: MoodHistory[];
  averageMood: number;
  moodTrend: 'up' | 'down' | 'stable';
  biggestWins: string[];
  recurringTopics: string[];
  emotionalPatterns: string[];
  aiReflection: string;
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  entryDates: string[];
  analyses: AIEntryAnalysis[];
}
