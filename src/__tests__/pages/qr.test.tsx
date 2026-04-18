import React from 'react';
import { render, screen } from '@testing-library/react';
import QRPage from '@/app/qr/page';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('QR Page', () => {
  it('renders the STADIUM GO branding', () => {
    render(<QRPage />);
    expect(screen.getByText('STADIUM GO')).toBeInTheDocument();
  });

  it('renders the unlocking message', () => {
    render(<QRPage />);
    expect(screen.getByText(/Unlocking your personalized experience/)).toBeInTheDocument();
  });

  it('renders the "Verifying Ticket" status', () => {
    render(<QRPage />);
    expect(screen.getByText('Verifying Ticket')).toBeInTheDocument();
  });

  it('renders the fallback message when no token is provided', () => {
    render(<QRPage />);
    expect(screen.getByText(/scan the QR code/)).toBeInTheDocument();
  });
});
