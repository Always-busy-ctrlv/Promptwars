import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LiveAlertsBanner } from '@/components/LiveAlertsBanner';

describe('LiveAlertsBanner', () => {
  it('renders alerts and allows dismissal', () => {
    render(<LiveAlertsBanner />);
    const alert = screen.getByText(/Gate 4 experiencing delays/i);
    expect(alert).toBeInTheDocument();

    const dismissBtn = screen.getByLabelText(/Dismiss alert/i);
    fireEvent.click(dismissBtn);
    expect(alert).not.toBeInTheDocument();
  });
});
