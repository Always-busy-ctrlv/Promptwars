import { db } from '@/lib/firebase';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

describe('Firebase Lib', () => {
  it('initializes firebase correctly', () => {
    expect(getApps).toHaveBeenCalled();
    expect(db).toBeDefined();
  });
});
