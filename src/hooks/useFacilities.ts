'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LucideIcon, Beer, Utensils, Ticket } from 'lucide-react';

export interface Facility {
  id: string;
  name: string;
  type: string;
  waitTime: number;
  status: 'green' | 'yellow' | 'red';
  location: string;
  iconType: 'beer' | 'utensils' | 'ticket';
}

const iconMap = {
  beer: Beer,
  utensils: Utensils,
  ticket: Ticket,
};

export const useFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'facilities'), orderBy('name', 'asc'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Facility[];
        
        setFacilities(data);
        setIsLoading(false);
        setLastUpdated(new Date());
        // Save to localStorage for SWR fallback
        localStorage.setItem('stadium_facilities_cache', JSON.stringify(data));
      },
      (err) => {
        console.error("Firestore error:", err);
        setError(err);
        setIsLoading(false);
        
        // SWR Fallback: Try to load from cache if network fails
        const cached = localStorage.getItem('stadium_facilities_cache');
        if (cached) {
          setFacilities(JSON.parse(cached));
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return { facilities, isLoading, error, lastUpdated, iconMap };
};
