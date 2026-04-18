import React from 'react';
import { render, screen } from '@testing-library/react';
import { StadiumMap } from '@/components/StadiumMap';

jest.mock('gsap', () => ({
  gsap: { to: jest.fn(), fromTo: jest.fn() },
}));

describe('StadiumMap', () => {
  it('renders the "Live Venue Flow" title', () => {
    render(<StadiumMap />);
    expect(screen.getByText('Live Venue Flow')).toBeInTheDocument();
  });

  it('renders the legend items', () => {
    render(<StadiumMap />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Busy')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('renders the FIELD label in SVG', () => {
    render(<StadiumMap />);
    expect(screen.getByText('FIELD')).toBeInTheDocument();
  });

  it('renders gate labels', () => {
    render(<StadiumMap />);
    expect(screen.getByText('Gate 4')).toBeInTheDocument();
    expect(screen.getByText('Gate 7')).toBeInTheDocument();
    expect(screen.getByText('Gate 1')).toBeInTheDocument();
    expect(screen.getByText('Gate 5')).toBeInTheDocument();
  });

  it('renders the pro-tip section', () => {
    render(<StadiumMap />);
    expect(screen.getByText(/Gate 7 is currently 40% less crowded/)).toBeInTheDocument();
  });

  it('initializes GSAP animations on mount', () => {
    const gsap = require('gsap').gsap;
    render(<StadiumMap />);
    expect(gsap.to).toHaveBeenCalled();
  });

  it('renders hotspot SVG circles', () => {
    const { container } = render(<StadiumMap />);
    const hotSpots = container.querySelectorAll('.hot-spot');
    expect(hotSpots.length).toBe(4);
  });
});
