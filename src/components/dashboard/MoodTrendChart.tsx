'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';
import type { MoodHistory } from '@/lib/types/database';

interface MoodTrendChartProps {
    data: MoodHistory[];
    timeframe: 'week' | 'month' | 'year';
}

export default function MoodTrendChart({ data, timeframe }: MoodTrendChartProps) {
    const chartData = useMemo(() => {
        // Group data for longer timeframes if needed (e.g., weekly averages for 'year')
        // For simplicity in the demo, we'll just show the raw points, but formatted
        return data.map(d => ({
            ...d,
            displayDate: timeframe === 'year'
                ? format(parseISO(d.date), 'MMM yyyy')
                : format(parseISO(d.date), 'MMM d'),
            fullDate: format(parseISO(d.date), 'EEEE, MMMM do, yyyy')
        }));
    }, [data, timeframe]);

    if (chartData.length === 0) return null;

    return (
        <div className="glass-panel p-6 rounded-2xl h-[350px] flex flex-col relative overflow-hidden">
            <h3 className="text-sm font-medium text-muted-foreground mb-6">Mood Trend</h3>

            <div className="flex-1 w-full min-h-0 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full w-full"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />   {/* High mood = purple/blueish */}
                                    <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.6} />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.4} /> {/* Low mood = cyanish */}
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <XAxis
                                dataKey="displayDate"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                tickMargin={10}
                                minTickGap={timeframe === 'year' ? 30 : 15}
                            />
                            <YAxis
                                domain={[0, 100]}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                ticks={[0, 25, 50, 75, 100]}
                            />
                            <ReferenceLine y={50} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const point = payload[0].payload;
                                        return (
                                            <div className="glass-panel px-3 py-2 rounded-lg border border-white/10 shadow-xl backdrop-blur-xl bg-black/60">
                                                <p className="text-xs text-muted-foreground mb-1">{point.fullDate}</p>
                                                <p className="text-lg font-bold text-white flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].color }} />
                                                    {point.mood_score} <span className="text-xs font-normal text-muted-foreground">/ 100</span>
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="mood_score"
                                stroke="url(#colorMood)"
                                strokeWidth={3}
                                dot={timeframe === 'week' ? { r: 4, fill: '#8b5cf6', strokeWidth: 0 } : false}
                                activeDot={{ r: 6, fill: '#fff', strokeWidth: 0 }}
                                filter="url(#glow)"
                                animationDuration={1500}
                                animationEasing="ease-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
