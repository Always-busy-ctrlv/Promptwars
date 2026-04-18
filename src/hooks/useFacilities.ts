'use client';

import { useState, useEffect } from 'react';
import { Beer, Utensils, Ticket, ShowerHead, Store } from 'lucide-react';
import { DEMO_FACILITIES } from '@/lib/constants';

/** Shape of a single facility entity. */
export interface Facility {
  id: string;
  name: string;
  type: string;
  waitTime: number;
  status: 'green' | 'yellow' | 'red';
  location: string;
  iconType: string;
}

/** Maps icon type strings to Lucide icon components. */
export const iconMap: Record<string, any> = {
  beer: Beer,
  utensils: Utensils,
  ticket: Ticket,
  shower: ShowerHead,
  store: Store,
};

/**
 * Real-time facility data hook.
 * Starts with demo data immediately, then upgrades to live Firestore if available.
 */
export const useFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>(DEMO_FACILITIES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function connectFirestore() {
      try {
        const { collection, onSnapshot, query, orderBy } = await import('firebase/firestore');
        const { db } = await import('@/lib/firebase');
        const q = query(collection(db, 'facilities'), orderBy('name', 'asc'));

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (snapshot.empty) return;
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Facility[];
            setFacilities(data);
            setIsLive(true);
            setIsLoading(false);
            setLastUpdated(new Date());
            if (typeof window !== 'undefined') {
              localStorage.setItem('stadium_facilities_cache', JSON.stringify(data));
            }
          },
          (err) => {
            console.warn('Firestore unavailable, using demo data:', err.message);
            if (typeof window !== 'undefined') {
              const cached = localStorage.getItem('stadium_facilities_cache');
              if (cached) setFacilities(JSON.parse(cached));
            }
            setIsLoading(false);
          }
        );
      } catch {
        console.warn('Firebase not configured, using demo data');
        setIsLoading(false);
      }
    }

    connectFirestore();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  return { facilities, isLoading, error, lastUpdated, isLive, iconMap };
};
