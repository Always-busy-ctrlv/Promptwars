import React from 'react';
import { render, screen } from '@testing-library/react';
import { WayfindingCard } from '@/components/WayfindingCard';

describe('WayfindingCard', () => {
  it('renders directions correctly', () => {
    const steps = ['Step 1', 'Step 2'];
    render(<WayfindingCard from="Start" to="End" walkTime={5} steps={steps} />);
    
    expect(screen.getByText(/Start → End/i)).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });
});
