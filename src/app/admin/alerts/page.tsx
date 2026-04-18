'use client';

import React, { useState } from 'react';
import { AlertTriangle, Send, Radio } from 'lucide-react';

export default function AlertsPage() {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'info' | 'warning' | 'emergency'>('info');
  const [sent, setSent] = useState(false);

  const severityConfig = {
    info:      { label: 'Info',      color: 'bg-cyan-500',   border: 'border-cyan-500/30' },
    warning:   { label: 'Warning',   color: 'bg-amber-500',  border: 'border-amber-500/30' },
    emergency: { label: 'Emergency', color: 'bg-rose-500',   border: 'border-rose-500/30' },
  };

  const handleBroadcast = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setMessage('');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-family-header)' }}>Emergency Broadcast</h1>

      {sent && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <Radio size={16} className="animate-pulse" />
          Alert broadcast successfully to all attendees
        </div>
      )}

      <div className="bg-slate-900/80 border border-slate-800/50 rounded-2xl p-6 space-y-5">
        {/* Severity */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Severity Level</label>
          <div className="flex gap-2">
            {(['info', 'warning', 'emergency'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSeverity(s)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  severity === s
                    ? `${severityConfig[s].color} text-white`
                    : `bg-slate-800 text-slate-400 hover:bg-slate-700`
                }`}
              >
                {severityConfig[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Broadcast Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="e.g. Heavy rain expected. Please proceed to covered exits via Gate 2 and Gate 5."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        <button
          onClick={handleBroadcast}
          disabled={!message.trim()}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
        >
          <Send size={16} />
          Broadcast to All Sections
        </button>
      </div>

      {/* Recent Alerts */}
      <div className="space-y-3">
        <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-family-header)' }}>Recent Broadcasts</h2>
        <div className="bg-slate-900/80 border border-slate-800/50 rounded-2xl divide-y divide-slate-800/30">
          {[
            { time: '14:32', msg: 'Gate 4 experiencing delays. Use Gate 7 as alternative exit.', sev: 'warning' as const },
            { time: '13:15', msg: 'Welcome to Finals 2026! Enjoy the game.', sev: 'info' as const },
          ].map((a, i) => (
            <div key={i} className="px-4 py-3 flex items-start gap-3">
              <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${severityConfig[a.sev].color}`} />
              <div>
                <p className="text-xs text-slate-300">{a.msg}</p>
                <p className="text-[9px] text-slate-600 font-bold mt-0.5">{a.time} today</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
