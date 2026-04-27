import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { EventProvider, useEvent } from '../../context/EventContext';

function EventConsumer() {
  const { events, addEvent } = useEvent();

  return (
    <div>
      <span data-testid="event-count">{events.length}</span>
      <button
        onClick={() =>
          addEvent({
            id: '99',
            title: 'Test Event',
            date: '2026-04-20',
            description: 'Added by test',
          })
        }
      >
        Add event
      </button>
    </div>
  );
}

describe('EventContext', () => {
  it('throws when useEvent is used outside the provider', () => {
    expect(() => render(<EventConsumer />)).toThrow(
      'useEvent must be used within EventProvider'
    );
  });

  it('starts empty and adds a new event', () => {
    render(
      <EventProvider>
        <EventConsumer />
      </EventProvider>
    );

    expect(screen.getByTestId('event-count')).toHaveTextContent('0');

    fireEvent.click(screen.getByRole('button', { name: 'Add event' }));
    expect(screen.getByTestId('event-count')).toHaveTextContent('1');
  });
});
