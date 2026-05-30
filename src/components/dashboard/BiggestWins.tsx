'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface BiggestWinsProps {
    wins: string[];
}

export default function BiggestWins({ wins }: BiggestWinsProps) {
    if (wins.length === 0) return null;

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Biggest Wins
            </h3>
            <div className="space-y-3">
                {wins.map((win, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <p className="text-sm font-medium leading-snug">{win}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
