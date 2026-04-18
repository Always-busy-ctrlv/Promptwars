import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIConcierge } from '@/components/AIConcierge';

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ response: 'AI response' }),
  })
) as jest.Mock;

describe('AIConcierge', () => {
  it('renders and handles chat flow', async () => {
    render(<AIConcierge />);
    
    // Open chat
    const toggleBtn = screen.getByRole('button');
    fireEvent.click(toggleBtn);
    
    const input = screen.getByPlaceholderText(/Ask me anything/i);
    fireEvent.change(input, { target: { value: 'Where is Gate 4?' } });
    
    const sendBtn = screen.getByRole('button', { name: /Send message/i });
    fireEvent.click(sendBtn);
    
    await waitFor(() => {
      expect(screen.getByText('AI response')).toBeInTheDocument();
    });
  });

  it('handles empty message submission', () => {
    render(<AIConcierge />);
    // Open chat
    fireEvent.click(screen.getByRole('button'));
    
    const sendBtn = screen.getByRole('button', { name: /Send message/i });
    fireEvent.click(sendBtn);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
