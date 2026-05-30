'use client';

import AppNav from '@/components/layout/AppNav';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            {/* Ambient background glows for the whole app */}
            <div className="ambient-glow bg-purple-500/20 top-[-20%] left-[-10%]" />
            <div className="ambient-glow bg-blue-500/20 bottom-[-20%] right-[-10%]" />

            {/* Sidebar */}
            <AppNav isDemo={true} />

            {/* Main Content Area */}
            <div className="flex-1 shrink flex overflow-hidden relative">
                <AnimatePresence mode="wait">
                    <motion.main
                        key="demo-content"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="flex-1 overflow-hidden"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </div>
        </div>
    );
}
