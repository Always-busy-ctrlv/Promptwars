import { renderHook, act, waitFor } from '@testing-library/react';
import { useFacilities, iconMap } from '@/hooks/useFacilities';

// Mock firebase
jest.mock('@/lib/firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn((_query: any, onSuccess: any) => {
    // Simulate an empty collection, so demo data should persist
    onSuccess({ empty: true, docs: [] });
    return jest.fn(); // unsubscribe
  }),
  query: jest.fn(),
  orderBy: jest.fn(),
}));

describe('useFacilities', () => {
  it('returns demo facilities immediately', () => {
    const { result } = renderHook(() => useFacilities());
    expect(result.current.facilities.length).toBeGreaterThan(0);
    expect(result.current.isLoading).toBe(false);
  });

  it('includes all expected demo facility names', () => {
    const { result } = renderHook(() => useFacilities());
    const names = result.current.facilities.map(f => f.name);
    expect(names).toContain('Burgers & Dogs');
    expect(names).toContain('Stadium Brews');
    expect(names).toContain('North Restroom');
    expect(names).toContain('South Restroom');
  });

  it('returns lastUpdated as a Date', () => {
    const { result } = renderHook(() => useFacilities());
    expect(result.current.lastUpdated).toBeInstanceOf(Date);
  });

  it('exports iconMap with expected keys', () => {
    expect(iconMap).toHaveProperty('beer');
    expect(iconMap).toHaveProperty('utensils');
    expect(iconMap).toHaveProperty('ticket');
  });

  it('returns error as null by default', () => {
    const { result } = renderHook(() => useFacilities());
    expect(result.current.error).toBeNull();
  });

  it('each facility has required fields', () => {
    const { result } = renderHook(() => useFacilities());
    result.current.facilities.forEach(f => {
      expect(f).toHaveProperty('id');
      expect(f).toHaveProperty('name');
      expect(f).toHaveProperty('type');
      expect(f).toHaveProperty('waitTime');
      expect(f).toHaveProperty('status');
      expect(f).toHaveProperty('location');
      expect(f).toHaveProperty('iconType');
    });
  });

  it('status values are valid', () => {
    const { result } = renderHook(() => useFacilities());
    result.current.facilities.forEach(f => {
      expect(['green', 'yellow', 'red']).toContain(f.status);
    });
  });
});
