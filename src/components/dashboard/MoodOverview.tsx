'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoodOverviewProps {
    score: number;
    trend: 'up' | 'down' | 'stable';
}

export default function MoodOverview({ score, trend }: MoodOverviewProps) {
    // Determine color based on score
    let colorClass = 'text-yellow-400';
    let gradientClass = 'from-yellow-400 to-yellow-600';
    let shadowClass = 'drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]';

    if (score >= 80) {
        colorClass = 'text-emerald-400';
        gradientClass = 'from-emerald-400 to-emerald-600';
        shadowClass = 'drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]';
    } else if (score >= 60) {
        colorClass = 'text-green-400';
        gradientClass = 'from-green-400 to-green-600';
        shadowClass = 'drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]';
    } else if (score <= 40) {
        colorClass = 'text-red-400';
        gradientClass = 'from-red-400 to-red-600';
        shadowClass = 'drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]';
    } else if (score <= 55) {
        colorClass = 'text-orange-400';
        gradientClass = 'from-orange-400 to-orange-600';
        shadowClass = 'drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]';
    }

    // Animation variants
    const circleVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: score / 100,
            opacity: 1,
            transition: { duration: 2, ease: "easeOut" as any }
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between overflow-hidden relative">
            <div className="z-10">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Mood</h3>
                <div className="flex items-baseline gap-2">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("text-5xl font-bold tracking-tighter", colorClass, shadowClass)}
                    >
                        {score}
                    </motion.span>
                    <span className="text-sm text-muted-foreground">/ 100</span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 flex items-center gap-1.5 text-xs font-medium"
                >
                    {trend === 'up' && <><ArrowUpRight className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400">Trending Up</span></>}
                    {trend === 'down' && <><ArrowDownRight className="w-4 h-4 text-red-500" /><span className="text-red-500">Trending Down</span></>}
                    {trend === 'stable' && <><Minus className="w-4 h-4 text-muted-foreground" /><span className="text-muted-foreground">Stable</span></>}
                </motion.div>
            </div>

            {/* Decorative SVG Circle */}
            <div className="relative w-32 h-32 flex-shrink-0 z-10">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-white/5"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        variants={circleVariants}
                        initial="hidden"
                        animate="visible"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" className="stop-color-1" />
                            <stop offset="100%" className="stop-color-2" />
                        </linearGradient>
                        <style>
                            {`
                .stop-color-1 { stop-color: ${score >= 80 ? '#34d399' : score >= 60 ? '#4ade80' : score <= 40 ? '#f87171' : score <= 55 ? '#fb923c' : '#facc15'}; }
                .stop-color-2 { stop-color: ${score >= 80 ? '#059669' : score >= 60 ? '#16a34a' : score <= 40 ? '#dc2626' : score <= 55 ? '#ea580c' : '#ca8a04'}; }
              `}
                        </style>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl transition-all duration-500">
                        {score >= 80 ? '✨' : score >= 60 ? '🌿' : score <= 40 ? '🌧️' : score <= 55 ? '☁️' : '☀️'}
                    </span>
                </div>
            </div>

            {/* Background ambient glow based on mood */}
            <div
                className={cn(
                    "absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000",
                    score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-green-500' : score <= 40 ? 'bg-red-500' : score <= 55 ? 'bg-orange-500' : 'bg-yellow-500'
                )}
            />
        </div>
    );
}
