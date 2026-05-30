'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) {
                setError(error.message);
            } else {
                setMessage('Check your email for a confirmation link!');
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setError(error.message);
            } else {
                router.push('/journal');
                router.refresh();
            }
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient background */}
            <div className="ambient-glow bg-purple-500 top-1/4 -left-48" />
            <div className="ambient-glow bg-blue-500 bottom-1/4 -right-48" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <BookOpen className="h-8 w-8 text-purple-400" />
                    <span className="text-2xl font-bold gradient-text">JournAI</span>
                </Link>

                <div className="glass-panel rounded-2xl p-8">
                    <h1 className="text-2xl font-semibold text-center mb-2">
                        {isSignUp ? 'Create your account' : 'Welcome back'}
                    </h1>
                    <p className="text-muted-foreground text-center mb-6 text-sm">
                        {isSignUp
                            ? 'Start your journey of self-discovery'
                            : 'Continue your reflection journey'}
                    </p>

                    {/* Google OAuth */}
                    <Button
                        variant="outline"
                        className="w-full mb-4 h-11 bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                        onClick={handleGoogleSignIn}
                    >
                        <Chrome className="h-4 w-4 mr-2" />
                        Continue with Google
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">or</span>
                        </div>
                    </div>

                    {/* Email form */}
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11 bg-white/5 border-white/10"
                            />
                        </div>
                        <div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="h-11 bg-white/5 border-white/10"
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-red-400 text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        {message && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-green-400 text-center"
                            >
                                {message}
                            </motion.p>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError('');
                                setMessage('');
                            }}
                            className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
                        >
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    Your data is private and encrypted. We never train AI on your entries.
                </p>
            </motion.div>
        </div>
    );
}
