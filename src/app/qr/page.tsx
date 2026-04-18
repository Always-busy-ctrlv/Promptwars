'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Sparkles, Loader2 } from 'lucide-react';

function QRAuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    async function authenticate() {
      if (token) {
        const result = await signIn('qr-token', {
          token,
          redirect: false,
        });

        if (result?.ok) {
          router.push('/');
        } else {
          console.error("Authentication failed");
        }
      }
    }
    authenticate();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-cyan-950 flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-700">
        <div className="bg-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
          <Sparkles className="text-white animate-pulse" size={32} />
        </div>
        
        <h1 className="text-3xl font-bold mb-2 tracking-tight">STADIUM GO</h1>
        <p className="text-cyan-200/70 mb-8 font-medium">Unlocking your personalized experience...</p>
        
        <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
          <Loader2 className="animate-spin" size={18} />
          Verifying Ticket
        </div>
      </div>
      
      {!token && (
        <p className="mt-8 text-cyan-200/50 text-xs">
          Please scan the QR code located on your seat armrest.
        </p>
      )}
    </div>
  );
}

export default function QRPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QRAuthContent />
    </Suspense>
  );
}
