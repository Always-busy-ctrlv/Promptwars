import React from 'react';
import { render, screen } from '@testing-library/react';
import { FacilityCard } from '@/components/FacilityCard';
import { Beer } from 'lucide-react';

describe('FacilityCard', () => {
  const defaultProps = {
    name: 'Test Facility',
    type: 'Food',
    waitTime: 5,
    status: 'green' as const,
    icon: Beer,
    location: 'Section 101',
  };

  it('renders the facility name', () => {
    render(<FacilityCard {...defaultProps} />);
    expect(screen.getByText('Test Facility')).toBeInTheDocument();
  });

  it('renders the facility type', () => {
    render(<FacilityCard {...defaultProps} />);
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('renders the wait time', () => {
    render(<FacilityCard {...defaultProps} />);
    expect(screen.getByText('5 min')).toBeInTheDocument();
  });

  it('renders the location', () => {
    render(<FacilityCard {...defaultProps} />);
    expect(screen.getByText('Section 101')).toBeInTheDocument();
  });

  it('renders "Clear" status for green', () => {
    render(<FacilityCard {...defaultProps} status="green" />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('renders "Busy" status for yellow', () => {
    render(<FacilityCard {...defaultProps} status="yellow" />);
    expect(screen.getByText('Busy')).toBeInTheDocument();
  });

  it('renders "Full" status for red', () => {
    render(<FacilityCard {...defaultProps} status="red" />);
    expect(screen.getByText('Full')).toBeInTheDocument();
  });

  it('renders without crashing for all status types', () => {
    const statuses: Array<'green' | 'yellow' | 'red'> = ['green', 'yellow', 'red'];
    statuses.forEach(status => {
      const { unmount } = render(<FacilityCard {...defaultProps} status={status} />);
      unmount();
    });
  });
});
