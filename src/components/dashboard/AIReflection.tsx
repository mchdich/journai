'use client';

import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

interface AIReflectionProps {
    reflection: string;
}

export default function AIReflection({ reflection }: AIReflectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-6 rounded-2xl border-purple-500/20 relative overflow-hidden group"
        >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                AI Reflection
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 relative z-10">
                {reflection}
            </p>
        </motion.div>
    );
}
