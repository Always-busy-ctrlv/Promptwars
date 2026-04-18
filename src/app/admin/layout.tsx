'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LayoutDashboard, Gift, AlertTriangle, Users, LogOut, Settings, Radio, Building2 } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Venues', icon: Building2, href: '/admin/venues' },
  { name: 'Incentives', icon: Gift, href: '/admin/incentives' },
  { name: 'Alerts', icon: AlertTriangle, href: '/admin/alerts' },
  { name: 'Staff', icon: Users, href: '/admin/staff' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: 'var(--font-family-body)' }}>
      {/* Sidebar */}
      <aside className="w-60 border-r border-slate-800/50 bg-slate-900/60 backdrop-blur-xl flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800/50">
          <h1 className="text-lg font-black tracking-tight text-cyan-400" style={{ fontFamily: 'var(--font-family-header)' }}>
            STADIUM<span className="text-slate-400">OPS</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-0.5">Command Center</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm font-medium ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User + Sign Out */}
        <div className="p-3 border-t border-slate-800/50 space-y-2">
          {session?.user && (
            <div className="px-3 py-2 flex items-center gap-2.5">
              {session.user.image ? (
                <img src={session.user.image} alt="" className="w-7 h-7 rounded-full" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center font-bold text-[10px] text-white">
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{session.user.name}</p>
                <p className="text-[9px] text-slate-500 truncate">{session.user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="px-6 py-4 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border border-emerald-500/20">
              <Radio size={10} className="animate-pulse" />
              System Live
            </div>
            <span className="text-slate-500 text-xs">Finals 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-800">
              <Settings size={18} />
            </button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
