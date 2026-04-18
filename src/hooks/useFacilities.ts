'use client';

import { useState, useEffect, useCallback } from 'react';
import { Beer, Utensils, Ticket, ShowerHead, Store } from 'lucide-react';

export interface Facility {
  id: string;
  name: string;
  type: string;
  waitTime: number;
  status: 'green' | 'yellow' | 'red';
  location: string;
  iconType: string;
}

export const iconMap: Record<string, any> = {
  beer: Beer,
  utensils: Utensils,
  ticket: Ticket,
  shower: ShowerHead,
  store: Store,
};

// Demo data that always works, even without Firestore
const DEMO_FACILITIES: Facility[] = [
  { id: 'f1', name: 'Burgers & Dogs',   type: 'Food',      waitTime: 2,  status: 'green',  iconType: 'utensils', location: 'Section 102' },
  { id: 'f2', name: 'Stadium Brews',    type: 'Drinks',    waitTime: 12, status: 'yellow', iconType: 'beer',     location: 'Section 104' },
  { id: 'f3', name: 'North Restroom',   type: 'Restroom',  waitTime: 15, status: 'red',    iconType: 'shower',   location: 'Section 101' },
  { id: 'f4', name: 'South Restroom',   type: 'Restroom',  waitTime: 4,  status: 'green',  iconType: 'shower',   location: 'Section 106' },
  { id: 'f5', name: 'West Merch Stand', type: 'Merch',     waitTime: 1,  status: 'green',  iconType: 'store',    location: 'Section 108' },
  { id: 'f6', name: 'Pizza Palace',     type: 'Food',      waitTime: 8,  status: 'yellow', iconType: 'utensils', location: 'Section 110' },
];

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

        unsubscribe = onSnapshot(q,
          (snapshot) => {
            if (snapshot.empty) return; // Keep demo data if collection is empty
            const data = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
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
            console.warn("Firestore unavailable, using demo data:", err.message);
            // Try cache first, otherwise keep demo
            if (typeof window !== 'undefined') {
              const cached = localStorage.getItem('stadium_facilities_cache');
              if (cached) setFacilities(JSON.parse(cached));
            }
            setIsLoading(false);
          }
        );
      } catch (e) {
        console.warn("Firebase not configured, using demo data");
        setIsLoading(false);
      }
    }

    connectFirestore();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  return { facilities, isLoading, error, lastUpdated, isLive, iconMap };
};
