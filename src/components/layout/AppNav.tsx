'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, LayoutDashboard, PenLine, LogOut, Settings } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppNavProps {
    isDemo?: boolean;
}

export default function AppNav({ isDemo = false }: AppNavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const prefix = isDemo ? '/demo' : '';

    const navItems = [
        { href: `${prefix}/dashboard`, label: 'Dashboard', icon: LayoutDashboard },
        { href: `${prefix}/journal`, label: 'Journal', icon: PenLine },
    ];

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <div className="h-screen w-16 sm:w-56 border-r border-white/5 bg-sidebar flex flex-col py-4 px-2 sm:px-3 shrink-0">
            {/* Logo */}
            <Link
                href={isDemo ? '/' : '/journal'}
                className="flex items-center gap-2 px-2 mb-8"
            >
                <BookOpen className="h-6 w-6 text-purple-400 shrink-0" />
                <span className="text-lg font-bold gradient-text hidden sm:block">JournAI</span>
            </Link>

            {/* Demo badge */}
            {isDemo && (
                <div className="mb-4 mx-2 px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 text-center hidden sm:block">
                    Demo Mode
                </div>
            )}

            {/* Nav items */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                isActive
                                    ? 'text-foreground'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute inset-0 bg-white/5 rounded-lg border border-white/5"
                                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                />
                            )}
                            <item.icon className="h-4 w-4 relative z-10 shrink-0" />
                            <span className="relative z-10 hidden sm:block">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div className="space-y-1">
                {!isDemo && (
                    <>
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                        >
                            <Settings className="h-4 w-4 shrink-0" />
                            <span className="hidden sm:block">Settings</span>
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <LogOut className="h-4 w-4 shrink-0" />
                            <span className="hidden sm:block">Sign Out</span>
                        </button>
                    </>
                )}
                {isDemo && (
                    <Link
                        href="/auth/login"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors"
                    >
                        <BookOpen className="h-4 w-4 shrink-0" />
                        <span className="hidden sm:block">Sign Up Free</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
