import { renderHook, waitFor } from '@testing-library/react';
import { useIncentives } from '@/hooks/useIncentives';

// Mock firestore behavior
const mockOnSnapshotInc = jest.fn();
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn((q, cb, err) => mockOnSnapshotInc(q, cb, err)),
  query: jest.fn(),
  where: jest.fn(),
}));

jest.mock('@/lib/firebase', () => ({ db: {} }));

describe('useIncentives Extended', () => {
  it('covers live data branch', async () => {
    mockOnSnapshotInc.mockImplementation((q, cb) => {
      setTimeout(() => cb({
        empty: false,
        docs: [{ id: '1', data: () => ({ title: 'Live Incentive', active: true }) }]
      }), 0);
      return () => {};
    });

    const { result } = renderHook(() => useIncentives());
    
    await waitFor(() => {
      expect(result.current.incentives[0].title).toBe('Live Incentive');
    }, { timeout: 2000 });
  });

  it('covers error branch', async () => {
    mockOnSnapshotInc.mockImplementation((q, cb, err) => {
      setTimeout(() => err(new Error('Failed')), 0);
      return () => {};
    });

    const { result } = renderHook(() => useIncentives());
    // Should still have demo data
    await waitFor(() => {
      expect(result.current.incentives.length).toBeGreaterThan(0);
    });
  });
});
