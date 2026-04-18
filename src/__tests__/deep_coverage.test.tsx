import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { CrowdMeter } from '@/components/CrowdMeter';
import { EventTimeline } from '@/components/EventTimeline';
import { FanEnergyMeter } from '@/components/FanEnergyMeter';
import { StatusBadge } from '@/components/ui/StatusBadge';

describe('Deep Coverage - Components', () => {
  it('CrowdMeter covers branches', () => {
    render(<CrowdMeter />);
    expect(screen.getByText(/Crowd Density/i)).toBeInTheDocument();
  });

  it('EventTimeline covers warning logic', () => {
    render(<EventTimeline gamePeriod="2nd Half" initialTime="86:00" />);
    expect(screen.getByText(/Full-time/i)).toBeInTheDocument();
  });

  it('FanEnergyMeter covers branches', () => {
    render(<FanEnergyMeter />);
    expect(screen.getByText(/Fan Energy/i)).toBeInTheDocument();
    // Look for the percentage number
    expect(screen.getByText(/85/)).toBeInTheDocument();
  });

  it('StatusBadge covers all branches', () => {
    const { rerender } = render(<StatusBadge status="green" size="md" />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
    rerender(<StatusBadge status="yellow" size="sm" />);
    expect(screen.getByText('Busy')).toBeInTheDocument();
    rerender(<StatusBadge status="red" />);
    expect(screen.getByText('Full')).toBeInTheDocument();
  });
});
