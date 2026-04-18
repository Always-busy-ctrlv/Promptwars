import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertsPage from '@/app/admin/alerts/page';

describe('Admin Alerts Page', () => {
  it('renders the "Emergency Broadcast" title', () => {
    render(<AlertsPage />);
    expect(screen.getByText('Emergency Broadcast')).toBeInTheDocument();
  });

  it('renders severity level buttons', () => {
    render(<AlertsPage />);
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Emergency')).toBeInTheDocument();
  });

  it('renders the broadcast button', () => {
    render(<AlertsPage />);
    expect(screen.getByText('Broadcast to All Sections')).toBeInTheDocument();
  });

  it('renders the message textarea', () => {
    render(<AlertsPage />);
    expect(screen.getByPlaceholderText(/Heavy rain expected/)).toBeInTheDocument();
  });

  it('shows a success message after broadcasting', () => {
    render(<AlertsPage />);
    const textarea = screen.getByPlaceholderText(/Heavy rain expected/);
    fireEvent.change(textarea, { target: { value: 'Test alert message' } });
    
    const broadcastBtn = screen.getByText('Broadcast to All Sections');
    fireEvent.click(broadcastBtn);

    expect(screen.getByText(/Alert broadcast successfully/)).toBeInTheDocument();
  });

  it('does not broadcast empty messages', () => {
    render(<AlertsPage />);
    const broadcastBtn = screen.getByText('Broadcast to All Sections');
    fireEvent.click(broadcastBtn);

    expect(screen.queryByText(/Alert broadcast successfully/)).not.toBeInTheDocument();
  });

  it('changes severity level when clicking buttons', () => {
    render(<AlertsPage />);
    const warningBtn = screen.getByText('Warning');
    fireEvent.click(warningBtn);
    // The button should now have the active class
    expect(warningBtn.className).toContain('bg-amber-500');
  });

  it('renders recent broadcasts section', () => {
    render(<AlertsPage />);
    expect(screen.getByText('Recent Broadcasts')).toBeInTheDocument();
    expect(screen.getByText(/Gate 4 experiencing delays/)).toBeInTheDocument();
  });
});
