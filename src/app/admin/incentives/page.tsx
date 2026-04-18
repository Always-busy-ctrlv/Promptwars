'use client';

import React from 'react';
import { useIncentives } from '@/hooks/useIncentives';
import { Plus } from 'lucide-react';

export default function IncentivesPage() {
  const { incentives, isLoading } = useIncentives();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">Incentive Control</h1>
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors">
          <Plus size={20} /> New Offer
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Target Gate</th>
              <th className="p-4">Prob. Weight</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading incentives...</td></tr>
            ) : (
              incentives.map(inc => (
                <tr key={inc.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold">{inc.title}</td>
                  <td className="p-4 text-slate-400">{inc.targetGate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: `${inc.probabilityWeight * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-bold">{Math.round(inc.probabilityWeight * 100)}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-[10px] font-bold uppercase border border-emerald-500/20">Active</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 font-bold">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
