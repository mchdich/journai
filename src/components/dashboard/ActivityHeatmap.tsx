'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, subDays, parseISO } from 'date-fns';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MoodHistory } from '@/lib/types/database';

interface ActivityHeatmapProps {
    entries: MoodHistory[];
    totalEntries: number;
    currentStreak: number;
    longestStreak: number;
    timeframe: 'week' | 'month' | 'year';
}

export default function ActivityHeatmap({ entries, totalEntries, currentStreak, longestStreak, timeframe }: ActivityHeatmapProps) {
    // Generate exact layout similar to the generic GitHub graph
    // showing the last 365 days
    const { blocks, months } = useMemo(() => {
        const today = new Date('2026-03-24T12:00:00Z');
        const start = subDays(today, 364); // 365 days total

        // Create a map of date string -> entry
        const entryMap = new Map<string, MoodHistory>();
        entries.forEach(e => entryMap.set(e.date, e));

        const weeks: { date: Date; entry: MoodHistory | undefined; dummy?: boolean }[][] = [];
        const _months: { name: string; weekIndex: number }[] = [];

        // We need to figure out what day of the week the start is to align columns properly
        // Start on Sunday (0) to match GitHub
        let current = new Date(start);
        // Rewind to the previous Sunday so the first column starts accurately at the top if needed
        // Actually standard github just stacks 7 blocks vertically.
        // Let's just build chunks of 7.
        let currentWeek: any[] = [];

        // Pad the beginning so the very last day aligns correctly at the bottom edge.
        // If today is a Tuesday (2), then that column has 3 days. The column starts on Sunday (0).
        const todayDayOfWeek = today.getDay(); // 0 is Sunday
        const daysToPadStart = 6 - todayDayOfWeek;

        // Just to keep things aligned perfectly
        for (let i = 0; i < 365; i++) {
            const dateObj = new Date(start);
            dateObj.setDate(start.getDate() + i);

            if (i === 0 || dateObj.getDate() === 1) {
                if (dateObj.getDate() === 1 || i === 0) {
                    // Register month label location if it's the first of the month, or the very beginning
                    const monthFormat = format(dateObj, 'MMM');
                    // avoid duplicate adjacent labels
                    if (_months.length === 0 || _months[_months.length - 1].name !== monthFormat) {
                        _months.push({ name: monthFormat, weekIndex: weeks.length });
                    }
                }
            }

            currentWeek.push({
                date: dateObj,
                entry: entryMap.get(dateObj.toISOString().split('T')[0])
            });

            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }

        if (currentWeek.length > 0) {
            // pad out the rest of the week visually
            while (currentWeek.length < 7) {
                currentWeek.push({ dummy: true });
            }
            weeks.push(currentWeek);
        }

        return { blocks: weeks, months: _months };
    }, [entries]);

    return (
        <div className="glass-panel p-6 rounded-2xl w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">
                        <span className="text-white">
                            {timeframe === 'year' ? '243' : timeframe === 'month' ? '30' : '7'}
                        </span>
                        <span className="text-muted-foreground font-normal text-sm">
                            entries in the {timeframe === 'week' ? 'past week' : timeframe === 'month' ? 'past month' : 'past year'}
                        </span>
                    </h3>
                    <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                </div>

                <div className="flex items-center gap-4 text-xs">
                    <span className="text-muted-foreground hidden sm:inline">Total active days: <span className="text-white font-medium">{totalEntries}</span></span>
                    <span className="text-muted-foreground hidden sm:inline">Max streak: <span className="text-white font-medium">{longestStreak}</span></span>
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-muted-foreground flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors">
                        Current
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="min-w-max flex flex-col gap-1">
                    {/* Heat map blocks */}
                    <div className="flex gap-1 items-start">
                        {blocks.map((week, weekIdx) => (
                            <div key={weekIdx} className="flex flex-col gap-1">
                                {week.map((day, dayIdx) => {
                                    if (day.dummy) {
                                        return <div key={`dummy-${dayIdx}`} className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] bg-transparent" />;
                                    }

                                    // Determine color based on mood score matching the leetcode image style
                                    let colorClass = "bg-[#2c2c2c]"; // No activity (dark gray)

                                    if (day.entry) {
                                        const score = day.entry.mood_score;
                                        if (score >= 80) colorClass = "bg-[#39d353]"; // Very good (bright green)
                                        else if (score >= 60) colorClass = "bg-[#26a641]"; // Good
                                        else if (score >= 40) colorClass = "bg-[#0e4429]"; // Low/Neutral
                                        else colorClass = "bg-red-500/80"; // Bad
                                    }

                                    return (
                                        <motion.div
                                            key={`day-${weekIdx}-${dayIdx}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: (weekIdx * 0.01) + (dayIdx * 0.005) }}
                                            className={cn(
                                                "w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] hover:ring-1 hover:ring-white/50 transition-all cursor-crosshair",
                                                colorClass
                                            )}
                                            title={day.entry ? `${format(day.date, 'MMM d, yyyy')}: Score ${day.entry.mood_score}` : format(day.date, 'MMM d, yyyy')}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Month labels underneath */}
                    <div className="flex relative h-6 mt-1 text-[10px] text-muted-foreground w-full">
                        {months.map((m, i) => {
                            // Approximate 16px per column (14px + gap)
                            return (
                                <div
                                    key={i}
                                    className="absolute top-0 transform -translate-x-1/2"
                                    style={{ left: `${m.weekIndex * (14 + 4)}px` }}
                                >
                                    {m.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Footer details (mobile) */}
            <div className="flex sm:hidden justify-between items-center text-xs mt-4 pt-4 border-t border-white/5 text-muted-foreground">
                <span>Total days: {totalEntries}</span>
                <span>Max streak: {longestStreak}</span>
            </div>
        </div>
    );
}
