import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { events as mockEvents, type Event } from '../data/mockData';

type EditFormState = {
  title: string;
  date: string;
};

const OrgDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>(() => mockEvents);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [form, setForm] = useState<EditFormState>({ title: '', date: '' });

  useEffect(() => {
    if (!user || user.role !== 'orgAdmin') {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  const organizerEvents = useMemo(() => {
    if (!user) return [];
    return events.filter((event) => event.organizerId === user.id);
  }, [events, user]);

  const startEdit = (event: Event) => {
    setEditingEventId(event.id);
    setForm({ title: event.title, date: event.date });
  };

  const cancelEdit = () => {
    setEditingEventId(null);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEventId) return;

    setEvents((prev) =>
      prev.map((event) =>
        event.id === editingEventId
          ? {
              ...event,
              title: form.title,
              date: form.date,
            }
          : event,
      ),
    );

    setEditingEventId(null);
  };

  if (!user || user.role !== 'orgAdmin') {
    return null;
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Organizer Dashboard</h2>

      {organizerEvents.length === 0 ? (
        <div>No events found for your organizer account.</div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {organizerEvents.map((event) => (
            <div
              key={event.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: 16,
                background: '#fff',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{event.title}</div>
                  <div style={{ color: '#6b7280', fontSize: 14 }}>{event.date}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ color: '#2563eb', fontWeight: 500, fontSize: 14 }}>
                    RSVP Count: {event.attendees.length}
                  </div>
                  <button type="button" onClick={() => startEdit(event)} style={{ padding: '6px 10px' }}>
                    Edit
                  </button>
                </div>
              </div>

              {editingEventId === event.id && (
                <form
                  onSubmit={saveEdit}
                  style={{ marginTop: 12, display: 'grid', gap: 10, maxWidth: 520 }}
                >
                  <label style={{ display: 'grid', gap: 4 }}>
                    Title
                    <input
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                      required
                      style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 4 }}>
                    Date
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                      required
                      style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                    />
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="submit">Save</button>
                    <button type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgDashboard;
