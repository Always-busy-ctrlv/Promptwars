'use client';

import React, { useState } from 'react';
import { DEMO_POLLS } from '@/lib/constants';
import type { Poll } from '@/lib/types';
import { BarChart3, Check } from 'lucide-react';

/** Interactive live poll card. Users can vote and see real-time results. */
export const LivePoll: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>(DEMO_POLLS);
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [currentPoll, setCurrentPoll] = useState(0);

  const poll = polls[currentPoll];
  if (!poll) return null;

  const hasVoted = voted.has(poll.id);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    setPolls((prev) =>
      prev.map((p) =>
        p.id === poll.id
          ? {
              ...p,
              totalVotes: p.totalVotes + 1,
              options: p.options.map((o) =>
                o.id === optionId ? { ...o, votes: o.votes + 1 } : o
              ),
            }
          : p
      )
    );
    setVoted((prev) => new Set(prev).add(poll.id));
  };

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
            <BarChart3 size={16} />
          </div>
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Live Poll</span>
        </div>
        {polls.length > 1 && (
          <div className="flex gap-1">
            {polls.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPoll(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentPoll ? 'bg-purple-500' : 'bg-purple-200'}`}
              />
            ))}
          </div>
        )}
      </div>

      <p className="font-bold text-cyan-950 text-sm" style={{ fontFamily: 'var(--font-family-header)' }}>
        {poll.question}
      </p>

      <div className="space-y-2">
        {poll.options.map((option) => {
          const pct = hasVoted ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full relative overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-all ${
                hasVoted
                  ? 'border-purple-200/50 cursor-default'
                  : 'border-cyan-200 hover:border-purple-400 hover:bg-purple-50/50 active:scale-[0.98]'
              }`}
            >
              {hasVoted && (
                <div
                  className="absolute inset-0 bg-purple-100/40 transition-all duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{option.emoji}</span>
                  <span className="text-xs font-semibold text-cyan-900">{option.label}</span>
                </div>
                {hasVoted && (
                  <span className="text-xs font-black text-purple-700 tabular-nums">{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {hasVoted && (
        <div className="flex items-center gap-1.5 text-[10px] text-purple-500 font-semibold">
          <Check size={12} />
          <span>{poll.totalVotes.toLocaleString()} votes · Thanks for voting!</span>
        </div>
      )}
    </div>
  );
};
