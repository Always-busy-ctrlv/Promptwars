'use client';

import { useState, useEffect } from 'react';
import { DEMO_INCENTIVES } from '@/lib/constants';

/** Shape of a single incentive offer. */
export interface Incentive {
  id: string;
  title: string;
  description: string;
  reward: string;
  targetGate: string;
  probabilityWeight: number;
  active: boolean;
}

/**
 * Real-time incentive data hook.
 * Starts with demo offers immediately, then upgrades to live Firestore if available.
 */
export const useIncentives = () => {
  const [incentives, setIncentives] = useState<Incentive[]>(DEMO_INCENTIVES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function connectFirestore() {
      try {
        const { collection, onSnapshot, query, where } = await import('firebase/firestore');
        const { db } = await import('@/lib/firebase');
        const q = query(collection(db, 'incentives'), where('active', '==', true));

        onSnapshot(q, (snapshot) => {
          if (snapshot.empty) return;
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Incentive[];
          setIncentives(data);
          setIsLoading(false);
        });
      } catch {
        console.warn('Firebase not configured, using demo incentives');
        setIsLoading(false);
      }
    }

    connectFirestore();
  }, []);

  return { incentives, isLoading };
};
