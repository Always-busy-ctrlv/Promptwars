import React from 'react';
import { render, screen } from '@testing-library/react';
import AttendeePortal from '@/app/page';
import { useSession } from 'next-auth/react';
import { useFacilities } from '@/hooks/useFacilities';
import { useIncentives } from '@/hooks/useIncentives';

// Mock the hooks
jest.mock('next-auth/react');
jest.mock('@/hooks/useFacilities');
jest.mock('@/hooks/useIncentives');
jest.mock('@/components/StadiumMap', () => ({
  StadiumMap: () => <div data-testid="stadium-map" />
}));

const MockIcon = () => <div data-testid="mock-icon" />;

describe('AttendeePortal (Home Page)', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: 'Alex', section: '102', row: 'G', seat: '14' }
      },
      status: 'authenticated'
    });

    (useFacilities as jest.Mock).mockReturnValue({
      facilities: [
        { id: '1', name: 'Burgers & Dogs', type: 'Food', waitTime: 2, status: 'green', location: 'Section 102', iconType: 'utensils' }
      ],
      lastUpdated: new Date(),
      isLive: true,
      iconMap: { utensils: MockIcon }
    });

    (useIncentives as jest.Mock).mockReturnValue({
      incentives: [
        { id: '1', title: 'Test Incentive', description: 'Desc', reward: 'Scarf', targetGate: 'Gate 7' }
      ]
    });
  });

  it('renders the welcome message with user name', () => {
    render(<AttendeePortal />);
    expect(screen.getByText(/Welcome, Alex/i)).toBeInTheDocument();
  });

  it('renders seat information', () => {
    render(<AttendeePortal />);
    expect(screen.getByText(/Section 102 · Row G · Seat 14/i)).toBeInTheDocument();
  });

  it('renders the stadium map', () => {
    render(<AttendeePortal />);
    expect(screen.getByTestId('stadium-map')).toBeInTheDocument();
  });

  it('renders facilities', () => {
    render(<AttendeePortal />);
    expect(screen.getByText('Burgers & Dogs')).toBeInTheDocument();
  });

  it('renders incentives', () => {
    render(<AttendeePortal />);
    expect(screen.getByText('Test Incentive')).toBeInTheDocument();
  });
});
