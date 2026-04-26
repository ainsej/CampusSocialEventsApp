import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvent } from '../context/EventContext';

const categoryColors: Record<string, string> = {
  'Club Meeting': '#4F46E5',
  'Career': '#059669',
  'Lecture': '#F59E42',
  'Sports': '#EF4444',
  'Arts': '#EC4899',
  'Volunteer': '#10B981',
  'Social': '#6366F1',
  'Workshop': '#FBBF24',
};

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  organizerId: string;
  attendees: string[];
};

const EventList: React.FC = () => {
  const { events } = useEvent();
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const uniqueCategories: string[] = useMemo(
    () => Array.from(new Set(events.map((e: Event) => e.category))),
    [events],
  );

  const filteredEvents = events.filter((event: Event) => {
    const matchesCategory = category === 'All' || event.category === category;
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="events-layout">
      <aside className="events-sidebar">
        <h3>Filters</h3>
        <div className="filter-group">
          <div className="filter-field">
            <label htmlFor="filter-category">Category</label>
            <select
              id="filter-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              {uniqueCategories.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="filter-search">Search</label>
            <input
              id="filter-search"
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </aside>

      <section>
        <div className="events-grid">
          {filteredEvents.map((event: Event) => (
            <div key={event.id} className="event-card">
              <div className="event-card-top">
                <Link to={`/events/${event.id}`} className="event-title-link">
                  {event.title}
                </Link>
                <span
                  style={{
                    background: categoryColors[event.category] || '#ddd',
                    color: '#fff',
                    borderRadius: 12,
                    padding: '2px 12px',
                    fontSize: 13,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {event.category}
                </span>
              </div>
              <div className="event-meta">{event.date} {event.time && `@ ${event.time}`}</div>
              <div className="event-location">{event.location}</div>
              <div className="rsvp-count">RSVP Count: {event.attendees.length}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventList;
