'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function OAuthCallbackPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // This will parse the redirect URL and store the session in cookies
        await supabase.auth.getSessionFromUrl({ storeSession: true });
      } catch (e) {
        console.error('OAuth callback error', e);
      } finally {
        router.replace('/journal');
      }
    })();
  }, [router, supabase]);

  return <div className="min-h-screen flex items-center justify-center">Signing in…</div>;
}
