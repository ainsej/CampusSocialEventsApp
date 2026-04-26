import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import EventList from '../../components/EventList';

vi.mock('../../data/mockData', () => ({
  events: [
    {
      id: '1',
      title: 'Chess Club Weekly Meeting',
      description: 'Chess event',
      date: '2026-04-10',
      time: '18:00',
      location: 'Student Center Room 101',
      category: 'Club Meeting',
      organizerId: 'a1',
      attendees: ['s1', 's2', 's3'],
    },
    {
      id: '2',
      title: 'Spring Career Fair',
      description: 'Career event',
      date: '2026-04-12',
      time: '10:00',
      location: 'Main Gymnasium',
      category: 'Career',
      organizerId: 'a2',
      attendees: ['s2', 's4'],
    },
    {
      id: '3',
      title: 'Board Game Night',
      description: 'Social event',
      date: '2026-04-25',
      time: '20:00',
      location: 'Dormitory Lounge',
      category: 'Social',
      organizerId: 'a2',
      attendees: ['s1'],
    },
  ],
}));

describe('EventList', () => {
  it('renders all events by default', () => {
    render(<EventList />);

    expect(screen.getByText('Chess Club Weekly Meeting')).toBeInTheDocument();
    expect(screen.getByText('Spring Career Fair')).toBeInTheDocument();
    expect(screen.getByText('Board Game Night')).toBeInTheDocument();
  });

  it('filters events by search text', () => {
    render(<EventList />);

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'chess' } });

    expect(screen.getByText('Chess Club Weekly Meeting')).toBeInTheDocument();
    expect(screen.queryByText('Spring Career Fair')).not.toBeInTheDocument();
    expect(screen.queryByText('Board Game Night')).not.toBeInTheDocument();
  });

  it('filters events by category', () => {
    render(<EventList />);

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'Career' } });

    expect(screen.getByText('Spring Career Fair')).toBeInTheDocument();
    expect(screen.queryByText('Chess Club Weekly Meeting')).not.toBeInTheDocument();
    expect(screen.queryByText('Board Game Night')).not.toBeInTheDocument();
  });

  it('shows RSVP count from attendee length', () => {
    render(<EventList />);

    expect(screen.getByText(/RSVP Count: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/RSVP Count: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/RSVP Count: 1/i)).toBeInTheDocument();
  });
});
