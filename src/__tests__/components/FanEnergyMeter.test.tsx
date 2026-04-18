import React from 'react';
import { render, screen } from '@testing-library/react';
import { FanEnergyMeter } from '@/components/FanEnergyMeter';
import { DEMO_FAN_ENERGY } from '@/lib/constants';

describe('FanEnergyMeter', () => {
  it('renders fan energy level and milestone', () => {
    render(<FanEnergyMeter />);
    expect(screen.getByText('Fan Energy')).toBeInTheDocument();
    expect(screen.getByText(DEMO_FAN_ENERGY.milestone)).toBeInTheDocument();
    expect(screen.getByText(String(DEMO_FAN_ENERGY.level))).toBeInTheDocument();
  });
});
