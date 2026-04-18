import { db, auth } from '@/lib/firebase';
import { getApps } from 'firebase/app';

jest.mock('firebase/app', () => ({
  getApps: jest.fn(() => []),
  initializeApp: jest.fn(),
  getApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({ type: 'firestore' })),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ type: 'auth' })),
}));

describe('Firebase Lib', () => {
  it('initializes firebase correctly', () => {
    expect(getApps).toHaveBeenCalled();
    expect(db).toBeDefined();
    expect(auth).toBeDefined();
  });
});
