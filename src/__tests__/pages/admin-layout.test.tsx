import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminLayout from '@/app/admin/layout';
import { useSession, signOut } from 'next-auth/react';

jest.mock('next-auth/react');

describe('Admin Layout', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Admin User', email: 'admin@test.com' } },
      status: 'authenticated'
    });
  });

  it('renders children and sidebar', () => {
    render(<AdminLayout><div>Test Content</div></AdminLayout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('STADIUM')).toBeInTheDocument();
  });

  it('renders user initials when no image', () => {
    render(<AdminLayout><div>Test</div></AdminLayout>);
    expect(screen.getByText('AU')).toBeInTheDocument();
  });

  it('handles sign out', () => {
    render(<AdminLayout><div>Test</div></AdminLayout>);
    const signOutBtn = screen.getByText(/Sign Out/i);
    fireEvent.click(signOutBtn);
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });
});
