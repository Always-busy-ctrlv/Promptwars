import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminDashboard from '@/app/admin/page';

jest.mock('@/hooks/useFacilities', () => ({
  useFacilities: () => ({
    facilities: [
      { id: 'f1', name: 'Test Facility', type: 'Food', waitTime: 5, status: 'green', iconType: 'utensils', location: 'Sec 102' },
      { id: 'f2', name: 'Test Bar', type: 'Drinks', waitTime: 12, status: 'yellow', iconType: 'beer', location: 'Sec 104' },
    ],
    isLoading: false,
    isLive: false,
    iconMap: {},
  }),
}));

jest.mock('@/components/StadiumMap', () => ({
  StadiumMap: () => <div data-testid="stadium-map">Map Mock</div>,
}));

describe('Admin Dashboard', () => {
  it('renders the Operations Dashboard title', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('Operations Dashboard')).toBeInTheDocument();
  });

  it('renders all KPI stat cards', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('Total Attendees')).toBeInTheDocument();
    expect(screen.getByText('42,108')).toBeInTheDocument();
    expect(screen.getByText('Flow Rate')).toBeInTheDocument();
    expect(screen.getByText('840/min')).toBeInTheDocument();
    expect(screen.getByText('Avg Wait Time')).toBeInTheDocument();
    expect(screen.getByText('8.2 min')).toBeInTheDocument();
    expect(screen.getByText('Active Alerts')).toBeInTheDocument();
  });

  it('renders trend indicators', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('+1,204')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });

  it('renders the density map section', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('Real-time Density Map')).toBeInTheDocument();
    expect(screen.getByTestId('stadium-map')).toBeInTheDocument();
  });

  it('renders the facility pulse section', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('Facility Pulse')).toBeInTheDocument();
    expect(screen.getByText('Test Facility')).toBeInTheDocument();
    expect(screen.getByText('Test Bar')).toBeInTheDocument();
  });

  it('shows demo mode indicator', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('● Demo Mode')).toBeInTheDocument();
  });
});
