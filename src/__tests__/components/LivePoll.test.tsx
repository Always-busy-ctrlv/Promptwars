import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LivePoll } from '@/components/LivePoll';
import { DEMO_POLLS } from '@/lib/constants';

describe('LivePoll', () => {
  it('renders a poll and handles voting', () => {
    render(<LivePoll />);
    expect(screen.getByText(DEMO_POLLS[0].question)).toBeInTheDocument();

    const option = screen.getByText(DEMO_POLLS[0].options[0].label);
    fireEvent.click(option);

    expect(screen.getByText(/Thanks for voting/i)).toBeInTheDocument();
  });

  it('handles multiple options', () => {
    render(<LivePoll />);
    DEMO_POLLS[0].options.forEach(opt => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });
});
