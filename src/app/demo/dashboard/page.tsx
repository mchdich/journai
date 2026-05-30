'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getDemoDashboardData } from '@/lib/demo/data';
import MoodOverview from '@/components/dashboard/MoodOverview';
import MoodTrendChart from '@/components/dashboard/MoodTrendChart';
import BiggestWins from '@/components/dashboard/BiggestWins';
import TopicsCloud from '@/components/dashboard/TopicsCloud';
import EmotionalPatterns from '@/components/dashboard/EmotionalPatterns';
import AIReflection from '@/components/dashboard/AIReflection';
import ActivityHeatmap from '@/components/dashboard/ActivityHeatmap';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DemoDashboardPage() {
    const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

    const data = getDemoDashboardData(timeframe);

    return (
        <div className="h-full w-full bg-background relative overflow-hidden flex flex-col">
            <div className="flex-1 w-full relative z-10 overflow-y-auto px-4 sm:px-8 py-8 custom-scrollbar">
                <div className="max-w-6xl mx-auto w-full space-y-6 pb-24">

                    {/* Header & Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-3xl font-bold mb-1">Your AI Mirror</h1>
                            <p className="text-muted-foreground text-sm">Visualize your emotional evolution over time.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Tabs
                                value={timeframe}
                                onValueChange={(v) => setTimeframe(v as 'week' | 'month' | 'year')}
                                className="w-full sm:w-auto"
                            >
                                <TabsList className="bg-white/5 border border-white/10 h-10 p-1">
                                    <TabsTrigger value="week" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">Past Week</TabsTrigger>
                                    <TabsTrigger value="month" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">Past Month</TabsTrigger>
                                    <TabsTrigger value="year" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">Past Year</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </motion.div>
                    </div>

                    {/* Top Row: AI Reflection span full, or Heatmap */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <ActivityHeatmap
                            entries={data.moodHistory}
                            totalEntries={data.totalEntries}
                            currentStreak={data.currentStreak}
                            longestStreak={data.longestStreak}
                            timeframe={timeframe}
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                        {/* Left Column: Overview & Trend */}
                        <div className="lg:col-span-2 space-y-6">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <MoodOverview score={data.averageMood} trend={data.moodTrend} />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <MoodTrendChart data={data.moodHistory} timeframe={timeframe} />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <AIReflection reflection={data.aiReflection} />
                            </motion.div>
                        </div>

                        {/* Right Column: Insights */}
                        <div className="space-y-6">
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                <BiggestWins wins={data.biggestWins} />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                                <TopicsCloud topics={data.recurringTopics} />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                                <EmotionalPatterns patterns={data.emotionalPatterns} />
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
