import React from 'react';
import { render, screen } from '@testing-library/react';
import AttendeePortal from '@/app/page';

// Mock hooks
jest.mock('@/hooks/useFacilities', () => ({
  useFacilities: () => ({
    facilities: [
      { id: 'f1', name: 'Test Food', type: 'Food', waitTime: 3, status: 'green', iconType: 'utensils', location: 'Sec 1' },
    ],
    isLoading: false,
    lastUpdated: new Date(),
    isLive: false,
    iconMap: { utensils: () => null, beer: () => null, ticket: () => null, shower: () => null, store: () => null },
  }),
}));

jest.mock('@/hooks/useIncentives', () => ({
  useIncentives: () => ({
    incentives: [
      { id: 'i1', title: 'Test Offer', description: 'Go here', reward: 'Gift', targetGate: 'G1', probabilityWeight: 1, active: true },
    ],
    isLoading: false,
  }),
}));

jest.mock('@/components/AIConcierge', () => ({
  AIConcierge: () => <div data-testid="ai-concierge">AI Mock</div>,
}));

jest.mock('@/components/StadiumMap', () => ({
  StadiumMap: () => <div data-testid="stadium-map">Map Mock</div>,
}));

describe('AttendeePortal (Home Page)', () => {
  it('renders the STADIUMGO header', () => {
    render(<AttendeePortal />);
    expect(screen.getByText(/STADIUM/)).toBeInTheDocument();
  });

  it('renders the welcome message', () => {
    render(<AttendeePortal />);
    expect(screen.getByText(/Welcome back, Alex/)).toBeInTheDocument();
  });

  it('renders the seat information', () => {
    render(<AttendeePortal />);
    expect(screen.getByText(/Section 102/)).toBeInTheDocument();
  });

  it('renders the stadium map', () => {
    render(<AttendeePortal />);
    expect(screen.getByTestId('stadium-map')).toBeInTheDocument();
  });

  it('renders the AI concierge', () => {
    render(<AttendeePortal />);
    expect(screen.getByTestId('ai-concierge')).toBeInTheDocument();
  });

  it('renders facility cards from hook data', () => {
    render(<AttendeePortal />);
    expect(screen.getByText('Test Food')).toBeInTheDocument();
  });

  it('renders incentive cards from hook data', () => {
    render(<AttendeePortal />);
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
  });

  it('shows the demo mode indicator', () => {
    render(<AttendeePortal />);
    expect(screen.getByText(/Demo/)).toBeInTheDocument();
  });

  it('renders the bottom navigation', () => {
    render(<AttendeePortal />);
    expect(screen.getByText('Map')).toBeInTheDocument();
    expect(screen.getByText('Alerts')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
