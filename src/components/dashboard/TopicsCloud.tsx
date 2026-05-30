'use client';

import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';

interface TopicsCloudProps {
    topics: string[];
}

export default function TopicsCloud({ topics }: TopicsCloudProps) {
    if (topics.length === 0) return null;

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4 text-cyan-500" />
                On Your Mind
            </h3>
            <div className="flex flex-wrap gap-2">
                {topics.map((topic, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-foreground hover:bg-white/10 transition-colors cursor-default"
                    >
                        {topic}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
