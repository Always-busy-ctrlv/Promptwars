import React from 'react';
import { render, screen } from '@testing-library/react';
import { BottomNav } from '@/components/ui/BottomNav';
import { Header } from '@/components/ui/Header';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');

describe('UI Components', () => {
  describe('BottomNav', () => {
    it('renders navigation items', () => {
      render(<BottomNav />);
      expect(screen.getByText('Map')).toBeInTheDocument();
      expect(screen.getByText('Alerts')).toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('renders branding and live status', () => {
      (useSession as jest.Mock).mockReturnValue({ data: null });
      render(<Header isLive={true} lastUpdated={new Date()} />);
      expect(screen.getByText(/STADIUM/i)).toBeInTheDocument();
      expect(screen.getByText(/Live/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Notifications/i })).toBeInTheDocument();
    });

    it('renders user session and handles sign out', () => {
      (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Admin' } } });
      const { signOut } = require('next-auth/react');
      render(<Header isLive={true} lastUpdated={new Date()} />);
      expect(screen.getByRole('button', { name: /LogOut/i })).toBeInTheDocument();
      const signOutBtn = screen.getByRole('button', { name: /LogOut/i });
      const { fireEvent } = require('@testing-library/react');
      fireEvent.click(signOutBtn);
      expect(signOut).toHaveBeenCalled();
    });
  });

  describe('SectionHeading', () => {
    it('renders title and optional count', () => {
      render(<SectionHeading title="Facilities" count={5} />);
      expect(screen.getByText('Facilities')).toBeInTheDocument();
      expect(screen.getByText('5 Available')).toBeInTheDocument();
    });
  });

  describe('StatusBadge', () => {
    it('renders different statuses', () => {
      const { rerender } = render(<StatusBadge status="green" />);
      expect(screen.getByText('Clear')).toBeInTheDocument();
      
      rerender(<StatusBadge status="yellow" />);
      expect(screen.getByText('Busy')).toBeInTheDocument();
      
      rerender(<StatusBadge status="red" />);
      expect(screen.getByText('Full')).toBeInTheDocument();
    });
  });
});
