'use client';

import React, { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, QrCode, Loader2, ArrowRight, Shield } from 'lucide-react';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');
  const [qrToken, setQrToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl });
  };

  const handleQRSignIn = async () => {
    if (!qrToken.trim()) return;
    setIsLoading(true);
    await signIn('qr-token', {
      token: qrToken,
      callbackUrl,
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-950 via-slate-900 to-cyan-900 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md space-y-6">
        {/* Branding */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 rounded-2xl shadow-2xl shadow-cyan-500/30 mb-6">
            <Sparkles className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>
            STADIUM<span className="text-cyan-400">GO</span>
          </h1>
          <p className="text-cyan-300/60 text-sm mt-1 font-medium">Smart Venue Navigation</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3 rounded-xl text-sm text-center">
            {error === 'OAuthAccountNotLinked'
              ? 'This email is already linked to another account.'
              : 'Something went wrong. Please try again.'}
          </div>
        )}

        {/* Google Sign In */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-family-header)' }}>Staff & Admin</h2>
            <p className="text-xs text-cyan-300/50 mt-0.5">Sign in with your Google account</p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all disabled:opacity-50 shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] text-cyan-400/50 font-bold uppercase tracking-widest">Or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* QR Token */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-family-header)' }}>Attendee Entry</h2>
            <p className="text-xs text-cyan-300/50 mt-0.5">Enter the code from your ticket QR</p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/40" size={16} />
              <input
                type="text"
                value={qrToken}
                onChange={(e) => setQrToken(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQRSignIn()}
                placeholder="Paste QR token..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-cyan-500/30 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <button
              onClick={handleQRSignIn}
              disabled={!qrToken.trim() || isLoading}
              className="bg-cyan-600 text-white px-4 rounded-xl hover:bg-cyan-500 transition-colors disabled:opacity-30"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-1.5 text-cyan-500/30 text-[10px] font-bold uppercase tracking-widest">
          <Shield size={10} />
          Secured by NextAuth
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2 className="animate-spin text-cyan-400" size={40} />
        </div>
      )}
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cyan-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-400" size={32} />
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
