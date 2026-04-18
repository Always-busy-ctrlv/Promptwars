'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Gift, AlertTriangle, Users, LogOut, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Incentives', icon: Gift, href: '/admin/incentives' },
    { name: 'Alerts', icon: AlertTriangle, href: '/admin/alerts' },
    { name: 'Staff', icon: Users, href: '/admin/staff' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-xl font-black tracking-tighter text-cyan-400">STADIUM OPS</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Command Center</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition-colors group"
            >
              <item.icon size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-900/20 text-rose-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
              ● System Live
            </div>
            <span className="text-slate-500 text-sm">Event: Finals 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
