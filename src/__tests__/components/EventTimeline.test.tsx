import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { EventTimeline } from '@/components/EventTimeline';

describe('EventTimeline', () => {
  it('renders initial time and period', () => {
    render(<EventTimeline gamePeriod="1st Half" initialTime="10:00" />);
    expect(screen.getByText('1st Half')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('shows warning when near break', () => {
    render(<EventTimeline gamePeriod="2nd Half" initialTime="86:00" />);
    expect(screen.getByText(/Full-time approaching/i)).toBeInTheDocument();
  });
});
