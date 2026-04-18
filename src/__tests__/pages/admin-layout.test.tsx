import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminLayout from '@/app/admin/layout';

describe('Admin Layout', () => {
  it('renders the STADIUMOPS branding', () => {
    render(<AdminLayout><div>Test Child</div></AdminLayout>);
    expect(screen.getByText(/STADIUM/)).toBeInTheDocument();
  });

  it('renders Command Center subtitle', () => {
    render(<AdminLayout><div>Test Child</div></AdminLayout>);
    expect(screen.getByText('Command Center')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<AdminLayout><div>Test Child</div></AdminLayout>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Incentives')).toBeInTheDocument();
    expect(screen.getByText('Alerts')).toBeInTheDocument();
    expect(screen.getByText('Staff')).toBeInTheDocument();
  });

  it('renders the Sign Out button', () => {
    render(<AdminLayout><div>Test Child</div></AdminLayout>);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<AdminLayout><div>Child Content</div></AdminLayout>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders the System Live indicator', () => {
    render(<AdminLayout><div>Test</div></AdminLayout>);
    expect(screen.getByText('System Live')).toBeInTheDocument();
  });

  it('renders the admin avatar', () => {
    render(<AdminLayout><div>Test</div></AdminLayout>);
    expect(screen.getByText('AD')).toBeInTheDocument();
  });
});
