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
    <div>
      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="All">All</option>
            {uniqueCategories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', minWidth: 200 }}
        />
      </div>

      {/* Event Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 24
      }}>
        {filteredEvents.map((event: Event) => (
          <div key={event.id} style={{
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: 20,
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Link
                to={`/events/${event.id}`}
                style={{ fontWeight: 600, fontSize: 18, color: 'inherit', textDecoration: 'none' }}
              >
                {event.title}
              </Link>
              <span style={{
                background: categoryColors[event.category] || '#ddd',
                color: '#fff',
                borderRadius: 12,
                padding: '2px 12px',
                fontSize: 13,
                fontWeight: 500
              }}>{event.category}</span>
            </div>
            <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>
              {event.date} {event.time && `@ ${event.time}`}
            </div>
            <div style={{ color: '#374151', fontSize: 15, marginBottom: 8 }}>
              {event.location}
            </div>
            <div style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }}>
              RSVP Count: {event.attendees.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
