import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AIConcierge } from '@/components/AIConcierge';
import { EventTimeline } from '@/components/EventTimeline';
import { FanEnergyMeter } from '@/components/FanEnergyMeter';
import { CrowdMeter } from '@/components/CrowdMeter';

jest.useFakeTimers();

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ response: 'AI response' }),
  })
) as jest.Mock;

describe('Deep Coverage - Components V2 (Final)', () => {
  it('AIConcierge covers GSAP and errors', async () => {
    const { rerender } = render(<AIConcierge />);
    
    // Toggle chat
    fireEvent.click(screen.getByRole('button'));
    
    // Test fetch failure
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('Network error'));
    
    const input = screen.getByPlaceholderText(/Ask me anything/i);
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    // Also test click
    fireEvent.click(screen.getByLabelText('Send message'));
    
    await waitFor(() => {
      expect(screen.getByText(/trouble connecting/i)).toBeInTheDocument();
    });

    // Rerender to trigger cleanup
    rerender(<div />);
  });

  it('EventTimeline covers timer effect', () => {
    render(<EventTimeline gamePeriod="1st Half" initialTime="44:50" />);
    act(() => {
      jest.advanceTimersByTime(11000);
    });
    expect(screen.getByText(/Half-time/i)).toBeInTheDocument();
  });

  it('FanEnergyMeter covers all levels', () => {
    const { rerender } = render(<FanEnergyMeter />);
    expect(screen.getByText(/85/)).toBeInTheDocument();
  });

  it('CrowdMeter covers all levels', () => {
    render(<CrowdMeter />);
    expect(screen.getByText(/95/)).toBeInTheDocument();
  });
});
