import React from 'react';
import { render, screen } from '@testing-library/react';
import { IncentiveCard } from '@/components/IncentiveCard';

// Mock gsap
jest.mock('gsap', () => ({
  gsap: { fromTo: jest.fn(), to: jest.fn() },
}));

describe('IncentiveCard', () => {
  const defaultProps = {
    title: 'Beat the Rush!',
    description: 'Gate 4 is busy. Go to Gate 7.',
    reward: 'Free Scarf',
    targetGate: 'Gate 7',
  };

  it('renders the title', () => {
    render(<IncentiveCard {...defaultProps} />);
    expect(screen.getByText('Beat the Rush!')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<IncentiveCard {...defaultProps} />);
    expect(screen.getByText('Gate 4 is busy. Go to Gate 7.')).toBeInTheDocument();
  });

  it('renders the reward', () => {
    render(<IncentiveCard {...defaultProps} />);
    expect(screen.getByText(/Free Scarf/)).toBeInTheDocument();
  });

  it('renders the target gate button', () => {
    render(<IncentiveCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Go to Gate 7/ })).toBeInTheDocument();
  });

  it('renders the "Smart Offer" label', () => {
    render(<IncentiveCard {...defaultProps} />);
    expect(screen.getByText('Smart Offer')).toBeInTheDocument();
  });

  it('applies GSAP animation on mount', () => {
    const gsap = require('gsap').gsap;
    render(<IncentiveCard {...defaultProps} />);
    expect(gsap.fromTo).toHaveBeenCalled();
  });
});
