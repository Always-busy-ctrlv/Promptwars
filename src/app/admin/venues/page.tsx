'use client';

import React, { useState } from 'react';
import { DEMO_VENUES } from '@/lib/constants';
import type { Venue } from '@/lib/types';
import { Plus, MapPin, Users, DoorOpen, Pencil, Trash2, X, Check, Building2 } from 'lucide-react';

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  live:     { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-500' },
  upcoming: { bg: 'bg-amber-500/10',   text: 'text-amber-400',   dot: 'bg-amber-500' },
  closed:   { bg: 'bg-slate-500/10',   text: 'text-slate-400',   dot: 'bg-slate-500' },
};

const EMPTY_VENUE: Omit<Venue, 'id'> = {
  name: '', city: '', capacity: 0, gates: 0, status: 'upcoming', currentEvent: '',
};

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>(DEMO_VENUES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Venue, 'id'>>(EMPTY_VENUE);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openCreate = () => {
    setForm(EMPTY_VENUE);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (venue: Venue) => {
    setForm({ name: venue.name, city: venue.city, capacity: venue.capacity, gates: venue.gates, status: venue.status, currentEvent: venue.currentEvent });
    setEditingId(venue.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.city.trim()) return;

    if (editingId) {
      setVenues((prev) => prev.map((v) => (v.id === editingId ? { ...v, ...form } : v)));
      showToast(`✅ "${form.name}" updated successfully`);
    } else {
      const newVenue: Venue = { id: `v${Date.now()}`, ...form };
      setVenues((prev) => [...prev, newVenue]);
      showToast(`✅ "${form.name}" added successfully`);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const venue = venues.find((v) => v.id === id);
    setVenues((prev) => prev.filter((v) => v.id !== id));
    showToast(`🗑️ "${venue?.name}" removed`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-family-header)' }}>Venue Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">{venues.length} venues configured</p>
        </div>
        <button onClick={openCreate} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm">
          <Plus size={18} /> Add Venue
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-2.5 rounded-xl text-sm font-semibold animate-in slide-in-from-top duration-300">
          {toast}
        </div>
      )}

      {/* Venue Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {venues.map((venue) => {
          const st = STATUS_STYLES[venue.status];
          return (
            <div key={venue.id} className="bg-slate-900/80 border border-slate-800/50 rounded-2xl p-5 hover:border-slate-700/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{venue.name}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-[10px] mt-0.5">
                      <MapPin size={10} />
                      <span>{venue.city}</span>
                    </div>
                  </div>
                </div>
                <div className={`${st.bg} px-2 py-0.5 rounded-full flex items-center gap-1`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                  <span className={`text-[9px] font-bold uppercase ${st.text}`}>{venue.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-800/50 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Users size={11} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Capacity</span>
                  </div>
                  <p className="font-black text-sm tabular-nums">{venue.capacity.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <DoorOpen size={11} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Gates</span>
                  </div>
                  <p className="font-black text-sm tabular-nums">{venue.gates}</p>
                </div>
              </div>

              {venue.currentEvent && (
                <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-lg px-3 py-1.5 mb-4">
                  <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-wider">Current Event</span>
                  <p className="text-xs font-semibold text-slate-300">{venue.currentEvent}</p>
                </div>
              )}

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(venue)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-300 transition-colors">
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(venue.id)} className="flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-semibold text-rose-400 transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black" style={{ fontFamily: 'var(--font-family-header)' }}>
                {editingId ? 'Edit Venue' : 'Add New Venue'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-500">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Venue Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. MetLife Stadium"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">City *</label>
                  <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. London, UK"
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Venue['status'] })}
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500">
                    <option value="live">Live</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Capacity</label>
                  <input type="number" value={form.capacity || ''} onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 0 })} placeholder="82500"
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Gates</label>
                  <input type="number" value={form.gates || ''} onChange={(e) => setForm({ ...form, gates: parseInt(e.target.value) || 0 })} placeholder="8"
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Current Event</label>
                <input value={form.currentEvent || ''} onChange={(e) => setForm({ ...form, currentEvent: e.target.value })} placeholder="e.g. FA Cup Final"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-semibold text-slate-400 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={!form.name.trim() || !form.city.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-sm font-bold text-white transition-colors">
                <Check size={16} /> {editingId ? 'Save Changes' : 'Create Venue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
