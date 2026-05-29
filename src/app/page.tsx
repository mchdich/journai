'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Brain, LineChart, Shield, Sparkles, ArrowRight, Lock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: BookOpen,
    title: 'Beautiful Journal',
    description: 'A clean, distraction-free writing experience. Autosave, markdown support, and smooth animations.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Every entry updates your personal AI profile. Understand your emotional patterns without re-reading everything.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: LineChart,
    title: 'Mood Analytics',
    description: 'Beautiful charts and heatmaps show your emotional trends. See how your mood evolves over weeks, months, and years.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Shield,
    title: 'Private by Default',
    description: 'Your entries are encrypted and never used for AI training. Delete everything anytime. Your data, your control.',
    gradient: 'from-orange-500 to-rose-500',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow bg-purple-500 top-[-200px] left-[10%]" />
      <div className="ambient-glow bg-blue-500 top-[40%] right-[-100px]" />
      <div className="ambient-glow bg-cyan-500 bottom-[-100px] left-[30%]" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold gradient-text">JournAI</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/demo/journal">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground cursor-pointer">
              Try Demo
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 cursor-pointer">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-32 text-center"
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            AI-powered self-reflection
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
        >
          Your thoughts,{' '}
          <span className="gradient-text">understood.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          A journal that grows with you. Write freely, and let AI reveal the patterns in your inner world — moods, wins, stressors, and the themes that shape your life.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <Link href="/auth/login">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 h-12 px-8 text-base cursor-pointer">
              Start Journaling
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/demo/journal">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
              Try Demo
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Mock dashboard preview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 max-w-5xl mx-auto px-6 pb-24"
      >
        <div className="glass-panel rounded-2xl p-6 glow-purple">
          <div className="grid grid-cols-3 gap-4">
            {/* Mini mood card */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-xs text-muted-foreground mb-1">Average Mood</p>
              <p className="text-3xl font-bold text-emerald-400">74</p>
              <p className="text-xs text-emerald-400 mt-1">↑ 8% this week</p>
            </div>
            {/* Mini streak card */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-purple-400">5 days</p>
              <p className="text-xs text-muted-foreground mt-1">Best: 12 days</p>
            </div>
            {/* Mini entries card */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-xs text-muted-foreground mb-1">Total Entries</p>
              <p className="text-3xl font-bold text-blue-400">47</p>
              <p className="text-xs text-muted-foreground mt-1">Since January</p>
            </div>
          </div>
          {/* Mini chart placeholder */}
          <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/5 h-32 flex items-end gap-1">
            {[65, 72, 58, 80, 74, 82, 68, 90, 75, 85, 78, 88, 72, 80, 76, 84, 70, 78, 82, 86].map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                className="flex-1 rounded-full bg-gradient-to-t from-purple-600 to-blue-500 opacity-60"
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="relative z-10 max-w-6xl mx-auto px-6 pb-24"
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
        >
          More than a journal
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
        >
          An AI-powered mirror of your inner life that helps you understand yourself better.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-xl p-6 hover:bg-white/[0.04] transition-colors"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Privacy section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="relative z-10 max-w-4xl mx-auto px-6 pb-24"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-2xl p-8 sm:p-12 text-center"
        >
          <Lock className="h-10 w-10 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your privacy is sacred</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Your journal is the most intimate record of your inner life. We treat it with the respect it deserves.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-sm">Encrypted Storage</h3>
              <p className="text-xs text-muted-foreground">All entries are encrypted at rest and in transit.</p>
            </div>
            <div className="space-y-2">
              <Brain className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-sm">No AI Training</h3>
              <p className="text-xs text-muted-foreground">Your data is never used to train AI models.</p>
            </div>
            <div className="space-y-2">
              <Trash2 className="h-5 w-5 text-rose-400" />
              <h3 className="font-semibold text-sm">Delete Anytime</h3>
              <p className="text-xs text-muted-foreground">Delete your entries, AI profile, or entire account at any time.</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-6 pb-24 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to understand yourself better?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Start writing today. Your AI mirror awaits.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/auth/login">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 h-12 px-8 cursor-pointer">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-purple-400" />
            <span>JournAI</span>
          </div>
          <p>© {new Date().getFullYear()} journai.mehdi.ch</p>
        </div>
      </footer>
    </div>
  );
}
