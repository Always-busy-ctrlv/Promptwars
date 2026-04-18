import React from 'react';

type Status = 'green' | 'yellow' | 'red';

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string; dot: string; border: string }> = {
  green:  { label: 'Clear', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  yellow: { label: 'Busy',  bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-500',   border: 'border-amber-200' },
  red:    { label: 'Full',  bg: 'bg-rose-50',     text: 'text-rose-700',    dot: 'bg-rose-500',    border: 'border-rose-200' },
};

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
}

/** Traffic-light status pill used across facility cards and admin tables. */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const cfg = STATUS_CONFIG[status];
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  const textSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

  return (
    <div className={`${cfg.bg} ${cfg.border} border px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0`}>
      <div className={`${dotSize} rounded-full ${cfg.dot}`} />
      <span className={`${textSize} font-bold uppercase ${cfg.text}`}>{cfg.label}</span>
    </div>
  );
};
