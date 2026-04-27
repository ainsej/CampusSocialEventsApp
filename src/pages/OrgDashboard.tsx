import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../context/EventContext';
import type { Event } from '../data/mockData';

type EditFormState = {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
};

type CreateFormState = {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
};

function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}`;
}

const OrgDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useEvent();

  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [form, setForm] = useState<EditFormState>({
    title: '',
    date: '',
    time: '09:00',
    location: '',
    category: 'Social',
    description: '',
  });
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<CreateFormState>({
    title: '',
    date: '',
    time: '09:00',
    location: '',
    category: 'Social',
    description: '',
  });

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
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description,
    });
  };

  const cancelEdit = () => {
    setEditingEventId(null);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEventId) return;

    updateEvent({
      id: editingEventId,
      title: form.title,
      date: form.date,
      time: form.time,
      location: form.location,
      category: form.category,
      description: form.description,
    });

    setEditingEventId(null);
  };

  if (!user || user.role !== 'orgAdmin') {
    return null;
  }

  const submitCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const event: Event = {
      id: newEventId(),
      title: createForm.title,
      description: createForm.description,
      date: createForm.date,
      time: createForm.time,
      location: createForm.location,
      category: createForm.category,
      organizerId: user.id,
      attendees: [],
    };

    addEvent(event);
    setCreateForm({
      title: '',
      date: '',
      time: '09:00',
      location: '',
      category: createForm.category,
      description: '',
    });

    setShowCreate(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Organizer Dashboard</h2>

      <div style={{ marginBottom: 16 }}>
        <button type="button" onClick={() => setShowCreate((prev) => !prev)}>
          {showCreate ? 'Close Create Event' : 'Create Event'}
        </button>
      </div>

      {showCreate && (
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: 16,
            background: '#fff',
            marginBottom: 16,
          }}
        >
          <h3 style={{ margin: 0, marginBottom: 12 }}>Create New Event</h3>
          <form onSubmit={submitCreate} style={{ display: 'grid', gap: 10, maxWidth: 720 }}>
            <label style={{ display: 'grid', gap: 4 }}>
              Title
              <input
                value={createForm.title}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, title: e.target.value }))}
                required
                style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <label style={{ display: 'grid', gap: 4 }}>
                Date
                <input
                  type="date"
                  value={createForm.date}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, date: e.target.value }))}
                  required
                  style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                />
              </label>
              <label style={{ display: 'grid', gap: 4 }}>
                Time
                <input
                  type="time"
                  value={createForm.time}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, time: e.target.value }))}
                  required
                  style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                />
              </label>
            </div>

            <label style={{ display: 'grid', gap: 4 }}>
              Location
              <input
                value={createForm.location}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, location: e.target.value }))}
                required
                style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
              />
            </label>

            <label style={{ display: 'grid', gap: 4 }}>
              Category
              <input
                value={createForm.category}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, category: e.target.value }))}
                required
                style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
              />
            </label>

            <label style={{ display: 'grid', gap: 4 }}>
              Description
              <textarea
                value={createForm.description}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
                style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db', resize: 'vertical' }}
              />
            </label>

            <div>
              <button type="submit">Create Event</button>
            </div>
          </form>
        </div>
      )}

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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
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
                    <label style={{ display: 'grid', gap: 4 }}>
                      Time
                      <input
                        type="time"
                        value={form.time}
                        onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                        required
                        style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                      />
                    </label>
                  </div>
                  <label style={{ display: 'grid', gap: 4 }}>
                    Location
                    <input
                      value={form.location}
                      onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                      required
                      style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 4 }}>
                    Category
                    <input
                      value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                      required
                      style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 4 }}>
                    Description
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db', resize: 'vertical' }}
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
