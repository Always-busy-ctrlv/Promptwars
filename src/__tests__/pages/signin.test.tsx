import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from '@/app/auth/signin/page';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('SignIn Page (Final Coverage)', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({ 
      get: jest.fn((key) => null)
    });
  });

  it('renders branding and sections', () => {
    render(<SignInPage />);
    expect(screen.getByText('STADIUM')).toBeInTheDocument();
    expect(screen.getByText('Staff & Admin')).toBeInTheDocument();
    expect(screen.getByText('Attendee Entry')).toBeInTheDocument();
  });

  it('handles Google Sign In', () => {
    render(<SignInPage />);
    fireEvent.click(screen.getByText('Sign in with Google'));
    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/' });
  });

  it('handles QR Sign In submission', async () => {
    render(<SignInPage />);
    const input = screen.getByPlaceholderText(/Paste QR token/i);
    fireEvent.change(input, { target: { value: 'TEST-TOKEN' } });
    
    // Test click
    fireEvent.click(screen.getByRole('button', { name: /ArrowRight/i })); 
    expect(signIn).toHaveBeenCalledWith('qr-token', { 
      token: 'TEST-TOKEN', 
      callbackUrl: '/', 
      redirect: true 
    });
  });

  it('handles Enter key on QR input', () => {
    render(<SignInPage />);
    const input = screen.getByPlaceholderText(/Paste QR token/i);
    fireEvent.change(input, { target: { value: 'ENTER-TOKEN' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(signIn).toHaveBeenCalledWith('qr-token', expect.objectContaining({ token: 'ENTER-TOKEN' }));
  });

  it('shows error messages for different error types', () => {
    const { rerender } = render(<SignInPage />);
    
    (useSearchParams as jest.Mock).mockReturnValue({ 
      get: jest.fn((key) => key === 'error' ? 'OAuthAccountNotLinked' : null)
    });
    rerender(<SignInPage />);
    expect(screen.getByText(/email is already linked/i)).toBeInTheDocument();

    (useSearchParams as jest.Mock).mockReturnValue({ 
      get: jest.fn((key) => key === 'error' ? 'SomethingElse' : null)
    });
    rerender(<SignInPage />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
