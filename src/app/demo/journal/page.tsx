'use client';

import { useState } from 'react';
import { demoEntries } from '@/lib/demo/data';
import { format } from 'date-fns';
import { Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { JournalEntry } from '@/lib/types/database';

export default function DemoJournalPage() {
    const [activeEntryId, setActiveEntryId] = useState<string>(demoEntries[0].id);
    const [searchQuery, setSearchQuery] = useState('');

    const activeEntry = demoEntries.find((e) => e.id === activeEntryId);

    const filteredEntries = demoEntries.filter(
        (e) =>
            e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full flex divide-x divide-white/5">
            {/* Entries Sidebar */}
            <div className="w-72 flex flex-col bg-sidebar shrink-0 relative z-10">
                <div className="p-4 flex flex-col gap-4 border-b border-white/5 bg-sidebar/50 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                            Entries
                        </h2>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-not-allowed">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search concepts, feelings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-white/5 border-none h-9 text-sm focus-visible:ring-1 focus-visible:ring-white/20"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="p-2 space-y-1">
                        {filteredEntries.map((entry) => {
                            const isActive = activeEntryId === entry.id;

                            // Get mood gradient class
                            let moodClass = "bg-white/10"; // neutral
                            if (entry.mood_score && entry.mood_score >= 80) moodClass = "bg-emerald-500/20 text-emerald-400";
                            else if (entry.mood_score && entry.mood_score >= 60) moodClass = "bg-green-500/20 text-green-400";
                            else if (entry.mood_score && entry.mood_score <= 40) moodClass = "bg-red-500/20 text-red-400";
                            else if (entry.mood_score && entry.mood_score <= 60) moodClass = "bg-yellow-500/20 text-yellow-400";

                            return (
                                <button
                                    key={entry.id}
                                    onClick={() => setActiveEntryId(entry.id)}
                                    className={cn(
                                        'w-full text-left p-3 rounded-xl transition-all duration-200 cursor-pointer relative group',
                                        isActive
                                            ? 'bg-white/10 text-foreground'
                                            : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-medium text-sm truncate mr-2">
                                            {entry.title || 'Untitled'}
                                        </h3>
                                        {entry.mood_score && (
                                            <div className={cn("text-[10px] px-1.5 py-0.5 rounded-full shrink-0", moodClass)}>
                                                {entry.mood_score}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs line-clamp-2 opacity-70 mb-2 leading-relaxed">
                                        {entry.content}
                                    </p>
                                    <div className="flex items-center justify-between text-[10px] opacity-60">
                                        <span>{format(new Date(entry.created_at), 'MMM d, yyyy')}</span>
                                        {entry.ai_tags && entry.ai_tags.length > 0 && (
                                            <span className="truncate ml-4">#{entry.ai_tags[0]}</span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 bg-background relative flex flex-col h-full overflow-hidden">
                {activeEntry ? (
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-3xl mx-auto px-8 py-16 w-full">
                            {/* Date & Tags Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={`header-${activeEntry.id}`}
                                className="mb-8"
                            >
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                    <span className="px-2 py-1 bg-white/5 rounded-md border border-white/5">
                                        {format(new Date(activeEntry.created_at), 'EEEE, MMMM do, yyyy')}
                                    </span>

                                    {activeEntry.ai_tags?.map(tag => (
                                        <span key={tag} className="text-xs text-purple-400 capitalize">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div
                                    className="w-full text-4xl block font-bold bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/50 text-foreground"
                                >
                                    {activeEntry.title}
                                </div>
                            </motion.div>

                            {/* Content Body */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={`body-${activeEntry.id}`}
                                className="mt-6"
                            >
                                {/* Simulated Editor Content */}
                                <div className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap font-sans">
                                    {activeEntry.content}
                                </div>
                            </motion.div>

                            {/* AI Insight Footer (Demo) */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                key={`footer-${activeEntry.id}`}
                                className="mt-16 pt-8 border-t border-white/5"
                            >
                                <div className="glass-panel p-5 rounded-2xl border-purple-500/20 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-purple-500/10 text-purple-400 mt-1 shrink-0">
                                            <span className="w-5 h-5 block sparkle-icon">✨</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground mb-1">AI Note</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {activeEntry.ai_summary}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        Select an entry to read
                    </div>
                )}
            </div>
        </div>
    );
}
