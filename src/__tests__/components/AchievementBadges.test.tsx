import React from 'react';
import { render, screen } from '@testing-library/react';
import { AchievementBadges } from '@/components/AchievementBadges';
import { DEMO_ACHIEVEMENTS } from '@/lib/constants';

describe('AchievementBadges', () => {
  it('renders achievements from constants', () => {
    render(<AchievementBadges />);
    expect(screen.getByText(/Achievements ·/i)).toBeInTheDocument();
    expect(screen.getByText(DEMO_ACHIEVEMENTS[0].title)).toBeInTheDocument();
  });
});
