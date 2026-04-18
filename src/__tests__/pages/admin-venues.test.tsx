import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VenuesPage from '@/app/admin/venues/page';
import { DEMO_VENUES } from '@/lib/constants';

describe('Admin Venues Page (Full Coverage)', () => {
  it('renders venue list', () => {
    render(<VenuesPage />);
    expect(screen.getByText(DEMO_VENUES[0].name)).toBeInTheDocument();
  });

  it('handles adding a new venue with all fields', async () => {
    render(<VenuesPage />);
    fireEvent.click(screen.getByText(/Add Venue/i));
    
    fireEvent.change(screen.getByPlaceholderText(/e.g. MetLife Stadium/i), { target: { value: 'New Test Venue' } });
    fireEvent.change(screen.getByPlaceholderText(/e.g. London, UK/i), { target: { value: 'Test City' } });
    
    // Test select and number inputs
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'live' } });
    fireEvent.change(screen.getByPlaceholderText('82500'), { target: { value: '50000' } });
    fireEvent.change(screen.getByPlaceholderText('8'), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText(/e.g. FA Cup Final/i), { target: { value: 'Test Event' } });
    
    fireEvent.click(screen.getByText(/Create Venue/i));
    
    await waitFor(() => {
      expect(screen.getByText('New Test Venue')).toBeInTheDocument();
    });
  });

  it('handles editing and canceling', async () => {
    render(<VenuesPage />);
    const editBtns = screen.getAllByText('Edit');
    fireEvent.click(editBtns[0]);
    
    // Test cancel
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Save Changes')).not.toBeInTheDocument();

    // Re-open and edit
    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.change(screen.getByPlaceholderText(/e.g. MetLife Stadium/i), { target: { value: 'Updated Name' } });
    fireEvent.click(screen.getByText(/Save Changes/i));
    
    await waitFor(() => {
      expect(screen.getByText('Updated Name')).toBeInTheDocument();
    });
  });

  it('handles deletion', async () => {
    render(<VenuesPage />);
    const venueName = DEMO_VENUES[0].name;
    const deleteBtns = screen.getAllByRole('button');
    const trashBtn = deleteBtns.find(b => b.querySelector('svg.lucide-trash2'));
    
    if (trashBtn) {
      fireEvent.click(trashBtn);
      await waitFor(() => {
        expect(screen.queryByText(venueName)).not.toBeInTheDocument();
      });
    }
  });

  it('handles form validation', () => {
    render(<VenuesPage />);
    fireEvent.click(screen.getByText(/Add Venue/i));
    const createBtn = screen.getByText(/Create Venue/i);
    expect(createBtn).toBeDisabled();
  });
});
