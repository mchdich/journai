'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface EmotionalPatternsProps {
    patterns: string[];
}

export default function EmotionalPatterns({ patterns }: EmotionalPatternsProps) {
    if (patterns.length === 0) return null;

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Insight Patterns
            </h3>
            <div className="space-y-4">
                {patterns.map((pattern, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-purple-500/50 before:rounded-full before:shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                    >
                        <p className="text-sm leading-relaxed text-foreground/90">{pattern}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
