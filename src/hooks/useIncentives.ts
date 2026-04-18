'use client';

import { useState, useEffect, useMemo } from 'react';

export interface Incentive {
  id: string;
  title: string;
  description: string;
  reward: string;
  targetGate: string;
  probabilityWeight: number;
  active: boolean;
}

// Demo incentives — always available
const DEMO_INCENTIVES: Incentive[] = [
  {
    id: 'i1',
    title: 'Beat the Gate 4 Rush!',
    description: 'Gate 4 is experiencing high volume. Exit via Gate 7 (West) instead and receive a voucher for a free official match scarf!',
    reward: 'Free Match Scarf',
    targetGate: 'Gate 7',
    probabilityWeight: 1.0,
    active: true,
  },
  {
    id: 'i2',
    title: 'Fast Beer Alert!',
    description: 'Section 108 Brews has zero wait right now. Head there for 10% off your order — offer valid for 15 minutes.',
    reward: '10% Off Drinks',
    targetGate: 'Section 108',
    probabilityWeight: 1.0,
    active: true,
  },
];

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
          if (snapshot.empty) return; // Keep demo data
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Incentive[];
          setIncentives(data);
          setIsLoading(false);
        });
      } catch (e) {
        console.warn("Firebase not configured, using demo incentives");
        setIsLoading(false);
      }
    }

    connectFirestore();
  }, []);

  return { incentives, isLoading };
};
