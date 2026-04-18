import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import QRPage from '@/app/qr/page';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('QR Page (Deep Coverage)', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders instructions when no token', () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => null });
    render(<QRPage />);
    expect(screen.getByText(/Please scan the QR code/i)).toBeInTheDocument();
  });

  it('attempts sign in when token is present', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => 'valid-token' });
    (signIn as jest.Mock).mockResolvedValue({ ok: true });
    
    render(<QRPage />);
    
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('qr-token', { token: 'valid-token', redirect: false });
    });
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('handles sign in failure', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => 'bad-token' });
    (signIn as jest.Mock).mockResolvedValue({ ok: false });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(<QRPage />);
    
    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
    });
    expect(consoleSpy).toHaveBeenCalledWith("Authentication failed");
    consoleSpy.mockRestore();
  });
});
