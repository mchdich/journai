'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function JournalPage() {
  const supabase = createClient();
  const [entries, setEntries] = useState<any[]>([]);
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setEntries(data || []);
      setActiveEntryId((prev) => prev ?? (data && data[0] && data[0].id) ?? null);
    }
    setLoading(false);
  }

  const todayHasEntry = entries.some((e) => {
    const d = new Date(e.created_at);
    const today = new Date();
    return (
      d.getUTCFullYear() === today.getUTCFullYear() &&
      d.getUTCMonth() === today.getUTCMonth() &&
      d.getUTCDate() === today.getUTCDate()
    );
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError('');

    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body?.error || 'Failed to create');
      } else {
        setTitle('');
        setContent('');
        await fetchEntries();
      }
    } catch (err: any) {
      setError(err.message || String(err));
    }

    setCreating(false);
  }

  const filtered = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeEntry = entries.find((e) => e.id === activeEntryId) || null;

  return (
    <div className="h-full flex divide-x divide-white/5">
      {/* Sidebar */}
      <div className="w-72 flex flex-col bg-sidebar shrink-0 relative z-10">
        <div className="p-4 flex flex-col gap-4 border-b border-white/5 bg-sidebar/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Entries
            </h2>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => {
                // open quick composer
                const el = document.getElementById('composer-title');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              disabled={todayHasEntry}
            >
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
            {filtered.map((entry) => {
              const isActive = activeEntryId === entry.id;

              let moodClass = 'bg-white/10';
              if (entry.mood_score && entry.mood_score >= 80) moodClass = 'bg-emerald-500/20 text-emerald-400';
              else if (entry.mood_score && entry.mood_score >= 60) moodClass = 'bg-green-500/20 text-green-400';
              else if (entry.mood_score && entry.mood_score <= 40) moodClass = 'bg-red-500/20 text-red-400';
              else if (entry.mood_score && entry.mood_score <= 60) moodClass = 'bg-yellow-500/20 text-yellow-400';

              return (
                <button
                  key={entry.id}
                  onClick={() => setActiveEntryId(entry.id)}
                  className={cn(
                    'w-full text-left p-3 rounded-xl transition-all duration-200 cursor-pointer relative group',
                    isActive ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-sm truncate mr-2">{entry.title || 'Untitled'}</h3>
                    {entry.mood_score && (
                      <div className={cn('text-[10px] px-1.5 py-0.5 rounded-full shrink-0', moodClass)}>{entry.mood_score}</div>
                    )}
                  </div>
                  <p className="text-xs line-clamp-2 opacity-70 mb-2 leading-relaxed">{entry.content}</p>
                  <div className="flex items-center justify-between text-[10px] opacity-60">
                    <span>{format(new Date(entry.created_at), 'MMM d, yyyy')}</span>
                    {entry.ai_tags && entry.ai_tags.length > 0 && <span className="truncate ml-4">#{entry.ai_tags[0]}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Editor / Reader */}
      <div className="flex-1 bg-background relative flex flex-col h-full overflow-hidden">
        <div className="p-8 max-w-3xl w-full mx-auto overflow-y-auto">
          {/* Composer */}
          <form id="composer-title" onSubmit={handleCreate} className="mb-8 space-y-4">
            <Input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white/5 border-none h-11" />
            <Textarea placeholder={todayHasEntry ? 'You have already created a journal entry for today.' : 'Write about your day...'} value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[160px] resize-none" disabled={todayHasEntry} />

            {error && <div className="text-sm text-red-400">{error}</div>}

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={creating || todayHasEntry} className="bg-gradient-to-r from-purple-600 to-blue-600">
                {creating ? 'Publishing...' : todayHasEntry ? 'Today already posted' : 'Publish Entry'}
              </Button>
              <Button variant="ghost" onClick={() => { setTitle(''); setContent(''); }}>
                Clear
              </Button>
            </div>
          </form>

          {/* Active Entry View */}
          {activeEntry ? (
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="px-2 py-1 bg-white/5 rounded-md border border-white/5">{format(new Date(activeEntry.created_at), 'EEEE, MMMM do, yyyy')}</span>
                  {activeEntry.ai_tags?.map((tag: string) => (<span key={tag} className="text-xs text-purple-400 capitalize">#{tag}</span>))}
                </div>

                <h1 className="text-4xl font-bold mb-4">{activeEntry.title || 'Untitled'}</h1>
                <div className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap font-sans">{activeEntry.content}</div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-10 pt-6 border-t border-white/5">
                <div className="glass-panel p-5 rounded-2xl border-purple-500/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-purple-500/10 text-purple-400 mt-1 shrink-0"><span className="w-5 h-5 block sparkle-icon">✨</span></div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">AI Note</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{activeEntry.ai_summary || 'Analysis pending — AI will summarize your entry shortly.'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">No entries yet — write your first one above.</div>
          )}
        </div>
      </div>
    </div>
  );
}
