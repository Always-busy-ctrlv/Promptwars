'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Incentive {
  id: string;
  title: string;
  description: string;
  reward: string;
  targetGate: string;
  probabilityWeight: number; // 0.0 - 1.0
  active: boolean;
}

export const useIncentives = () => {
  const [rawIncentives, setRawIncentives] = useState<Incentive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Stable user seed for consistent probabilistic experience per session
  const userSeed = useMemo(() => {
    let seed = localStorage.getItem('stadium_user_seed');
    if (!seed) {
      seed = Math.random().toString();
      localStorage.setItem('stadium_user_seed', seed);
    }
    return parseFloat(seed);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'incentives'), where('active', '==', true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Incentive[];
      setRawIncentives(data);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Probabilistic filtering: only show if userSeed < probabilityWeight
  const incentives = useMemo(() => {
    return rawIncentives.filter(inc => userSeed < (inc.probabilityWeight || 1.0));
  }, [rawIncentives, userSeed]);

  return { incentives, isLoading };
};
