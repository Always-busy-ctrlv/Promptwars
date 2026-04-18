import { renderHook } from '@testing-library/react';
import { useIncentives } from '@/hooks/useIncentives';

jest.mock('@/lib/firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn((_query: any, onSuccess: any) => {
    onSuccess({ empty: true, docs: [] });
    return jest.fn();
  }),
  query: jest.fn(),
  where: jest.fn(),
}));

describe('useIncentives', () => {
  it('returns demo incentives immediately', () => {
    const { result } = renderHook(() => useIncentives());
    expect(result.current.incentives.length).toBeGreaterThan(0);
    expect(result.current.isLoading).toBe(false);
  });

  it('includes expected demo incentive titles', () => {
    const { result } = renderHook(() => useIncentives());
    const titles = result.current.incentives.map(i => i.title);
    expect(titles).toContain('Beat the Gate 4 Rush!');
    expect(titles).toContain('Fast Beer Alert!');
  });

  it('each incentive has required fields', () => {
    const { result } = renderHook(() => useIncentives());
    result.current.incentives.forEach(i => {
      expect(i).toHaveProperty('id');
      expect(i).toHaveProperty('title');
      expect(i).toHaveProperty('description');
      expect(i).toHaveProperty('reward');
      expect(i).toHaveProperty('targetGate');
      expect(i).toHaveProperty('probabilityWeight');
      expect(i).toHaveProperty('active');
    });
  });

  it('all demo incentives are active', () => {
    const { result } = renderHook(() => useIncentives());
    result.current.incentives.forEach(i => {
      expect(i.active).toBe(true);
    });
  });
});
