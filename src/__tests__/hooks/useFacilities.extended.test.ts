import { renderHook, act, waitFor } from '@testing-library/react';
import { useFacilities } from '@/hooks/useFacilities';
import * as firestore from 'firebase/firestore';

// Mock firestore behavior
const mockOnSnapshot = jest.fn();
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn((q, cb, err) => mockOnSnapshot(q, cb, err)),
  query: jest.fn(),
  orderBy: jest.fn(),
}));

// We need to mock the dynamic import behavior
jest.mock('@/lib/firebase', () => ({ db: {} }));

describe('useFacilities Hook - Edge Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates state when Firestore returns data', async () => {
    mockOnSnapshot.mockImplementation((q, cb) => {
      setTimeout(() => cb({
        empty: false,
        docs: [{ id: '1', data: () => ({ name: 'Live Facility', type: 'Food', waitTime: 0, status: 'green', location: '101', iconType: 'beer' }) }]
      }), 0);
      return () => {};
    });

    const { result } = renderHook(() => useFacilities());
    
    await waitFor(() => {
      expect(result.current.isLive).toBe(true);
    }, { timeout: 2000 });
    
    expect(result.current.facilities[0].name).toBe('Live Facility');
  });

  it('handles Firestore error by falling back to cache', async () => {
    const cachedData = [{ id: 'cache', name: 'Cached', type: 'Food', waitTime: 0, status: 'green', location: '101', iconType: 'beer' }];
    window.localStorage.setItem('stadium_facilities_cache', JSON.stringify(cachedData));
    
    mockOnSnapshot.mockImplementation((q, cb, err) => {
      setTimeout(() => err(new Error('Firestore failed')), 0);
      return () => {};
    });

    const { result } = renderHook(() => useFacilities());
    
    await waitFor(() => {
      expect(result.current.facilities[0].name).toBe('Cached');
    }, { timeout: 2000 });
  });
});
