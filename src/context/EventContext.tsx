import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { events as mockEvents, type Event } from '../data/mockData';

type UpdateEventInput = Pick<Event, 'id'> & Partial<Pick<Event, 'title' | 'date' | 'time' | 'location' | 'category' | 'description'>>;

interface EventContextType {
  events: Event[];
  getEventById: (id: string) => Event | undefined;
  addEvent: (event: Event) => void;
  updateEvent: (input: UpdateEventInput) => void;
  addAttendee: (eventId: string, userId: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(() => mockEvents);

  const getEventById = (id: string) => events.find((e) => e.id === id);

  const addEvent = (event: Event) => {
    setEvents((prev) => [event, ...prev]);
  };

  const updateEvent = (input: UpdateEventInput) => {
    setEvents((prev) => prev.map((e) => (e.id === input.id ? { ...e, ...input } : e)));
  };

  const addAttendee = (eventId: string, userId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== eventId) return e;
        if (e.attendees.includes(userId)) return e;
        return { ...e, attendees: [...e.attendees, userId] };
      }),
    );
  };

  const value = useMemo<EventContextType>(
    () => ({ events, getEventById, addEvent, updateEvent, addAttendee }),
    [events],
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvent must be used within an EventProvider');
  return context;
};
