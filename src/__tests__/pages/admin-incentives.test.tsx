import React from 'react';
import { render, screen } from '@testing-library/react';
import IncentivesPage from '@/app/admin/incentives/page';

jest.mock('@/hooks/useIncentives', () => ({
  useIncentives: () => ({
    incentives: [
      { id: 'i1', title: 'Test Offer', description: 'test', reward: 'Gift', targetGate: 'Gate 7', probabilityWeight: 0.8, active: true },
    ],
    isLoading: false,
  }),
}));

describe('Admin Incentives Page', () => {
  it('renders the "Incentive Control" title', () => {
    render(<IncentivesPage />);
    expect(screen.getByText('Incentive Control')).toBeInTheDocument();
  });

  it('renders the "New Offer" button', () => {
    render(<IncentivesPage />);
    expect(screen.getByText(/New Offer/)).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<IncentivesPage />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Target Gate')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders incentive rows', () => {
    render(<IncentivesPage />);
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('Gate 7')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('renders edit buttons for each incentive', () => {
    render(<IncentivesPage />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('shows Active status badge', () => {
    render(<IncentivesPage />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
