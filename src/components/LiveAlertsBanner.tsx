'use client';

import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'emergency';
}

const DEMO_ALERTS: Alert[] = [
  { id: 'a1', message: 'Gate 4 experiencing delays — use Gate 7 as alternative exit', severity: 'warning' },
];

/** Scrolling alert banner on attendee page for emergency/info broadcasts from admin. */
export const LiveAlertsBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const activeAlerts = DEMO_ALERTS.filter((a) => !dismissed.has(a.id));

  if (activeAlerts.length === 0) return null;

  const severityConfig = {
    info:      { bg: 'bg-cyan-600', border: 'border-cyan-500/30', icon: '📢' },
    warning:   { bg: 'bg-amber-600', border: 'border-amber-500/30', icon: '⚠️' },
    emergency: { bg: 'bg-rose-600', border: 'border-rose-500/30', icon: '🚨' },
  };

  return (
    <div className="space-y-2">
      {activeAlerts.map((alert) => {
        const cfg = severityConfig[alert.severity];
        return (
          <div
            key={alert.id}
            className={`${cfg.bg} text-white rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-lg animate-in slide-in-from-top duration-500`}
          >
            <Megaphone size={16} className="shrink-0" />
            <p className="text-xs font-semibold flex-1">{alert.message}</p>
            <button
              onClick={() => setDismissed((prev) => new Set(prev).add(alert.id))}
              className="p-0.5 hover:bg-white/20 rounded transition-colors shrink-0"
              aria-label="Dismiss alert"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
