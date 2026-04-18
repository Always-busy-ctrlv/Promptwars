import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIConcierge } from '@/components/AIConcierge';

jest.mock('gsap', () => ({
  gsap: {
    fromTo: jest.fn(),
    to: jest.fn((_target: any, opts: any) => {
      if (opts?.onComplete) opts.onComplete();
    }),
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe('AIConcierge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ response: 'Mocked AI Response' }),
    });
  });

  it('renders the toggle button', () => {
    render(<AIConcierge />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('opens the chat panel on toggle click', () => {
    render(<AIConcierge />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('AI Concierge')).toBeInTheDocument();
  });

  it('shows the welcome message when opened', () => {
    render(<AIConcierge />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText(/Welcome to the Stadium/)).toBeInTheDocument();
  });

  it('sends a message and shows user input', async () => {
    render(<AIConcierge />);
    fireEvent.click(screen.getAllByRole('button')[0]); // open

    const input = screen.getByPlaceholderText('Ask anything...');
    fireEvent.change(input, { target: { value: 'Where is beer?' } });
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText('Where is beer?')).toBeInTheDocument();
    });
  });

  it('displays the AI response after sending', async () => {
    render(<AIConcierge />);
    fireEvent.click(screen.getAllByRole('button')[0]);

    const input = screen.getByPlaceholderText('Ask anything...');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText('Mocked AI Response')).toBeInTheDocument();
    });
  });

  it('shows an error message when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<AIConcierge />);
    fireEvent.click(screen.getAllByRole('button')[0]);

    const input = screen.getByPlaceholderText('Ask anything...');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText(/trouble connecting/)).toBeInTheDocument();
    });
  });

  it('does not send empty messages', () => {
    render(<AIConcierge />);
    fireEvent.click(screen.getAllByRole('button')[0]);

    const input = screen.getByPlaceholderText('Ask anything...');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('clears input after sending', async () => {
    render(<AIConcierge />);
    fireEvent.click(screen.getAllByRole('button')[0]);

    const input = screen.getByPlaceholderText('Ask anything...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});
