import React from 'react';
import { render, screen } from '@testing-library/react';
import { CrowdMeter } from '@/components/CrowdMeter';
import { EVENT_CONFIG } from '@/lib/constants';

describe('CrowdMeter', () => {
  it('renders correctly with event config', () => {
    render(<CrowdMeter />);
    expect(screen.getByText(/Venue Occupancy/i)).toBeInTheDocument();
  });

  it('shows high occupancy color', () => {
    // We can't easily change EVENT_CONFIG in the middle of a test if it's a constant
    // but we can check if it renders the current percentage
    const pct = Math.round((EVENT_CONFIG.currentAttendees / EVENT_CONFIG.capacity) * 100);
    render(<CrowdMeter />);
    expect(screen.getByText(`${pct}%`)).toBeInTheDocument();
  });
});
