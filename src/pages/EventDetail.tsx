import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../context/EventContext';

const REMINDER_OFFSET_MS = 60 * 60 * 1000; // 1 hour

function parseEventDateTime(date: string, time?: string): Date {
  // date is ISO yyyy-mm-dd; time is hh:mm
  const dateTimeStr = time ? `${date}T${time}:00` : `${date}T09:00:00`;
  return new Date(dateTimeStr);
}

async function ensureNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  return Notification.requestPermission();
}

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, rsvpToEvent } = useAuth();
  const { getEventById, addAttendee } = useEvent();

  const [reminderStatus, setReminderStatus] = useState<string>('');

  const event = useMemo(() => (id ? getEventById(id) : undefined), [getEventById, id]);
  const alreadyRsvped = Boolean(user && event && user.rsvps.includes(event.id));

  const handleRsvp = async () => {
    if (!event) return;
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'student') return;

    rsvpToEvent(event.id);
    addAttendee(event.id, user.id);

    const permission = await ensureNotificationPermission();
    const eventDateTime = parseEventDateTime(event.date, event.time);
    const reminderAt = new Date(eventDateTime.getTime() - REMINDER_OFFSET_MS);
    const delayMs = reminderAt.getTime() - Date.now();

    if (permission === 'granted') {
      const showReminder = () => {
        // eslint-disable-next-line no-new
        new Notification('Event Reminder', {
          body: `${event.title} starts at ${event.date}${event.time ? ` ${event.time}` : ''}.`,
        });
      };

      if (delayMs <= 0) {
        showReminder();
        setReminderStatus('Reminder sent (event is soon).');
      } else {
        window.setTimeout(showReminder, delayMs);
        setReminderStatus('Reminder scheduled (1 hour before start).');
      }
    } else if (permission === 'unsupported') {
      setReminderStatus('Notifications are not supported in this browser.');
    } else {
      setReminderStatus('Notification permission not granted.');
    }
  };

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <button type="button" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Back
      </button>

      <h2 style={{ marginBottom: 6 }}>{event.title}</h2>
      <div style={{ color: '#6b7280', marginBottom: 12 }}>
        {event.date} {event.time ? `@ ${event.time}` : ''}
      </div>

      <div style={{ marginBottom: 12 }}>
        <div><strong>Location:</strong> {event.location}</div>
        <div><strong>Category:</strong> {event.category}</div>
      </div>

      <div style={{ marginBottom: 16 }}>{event.description}</div>

      <div style={{ color: '#2563eb', fontWeight: 500, marginBottom: 12 }}>
        RSVP Count: {event.attendees.length}
      </div>

      <button
        type="button"
        onClick={handleRsvp}
        disabled={Boolean(!user || user.role !== 'student' || alreadyRsvped)}
      >
        {alreadyRsvped ? 'RSVP’d' : 'RSVP'}
      </button>

      {reminderStatus && <div style={{ marginTop: 10, color: '#374151' }}>{reminderStatus}</div>}

      {!user && (
        <div style={{ marginTop: 10, color: '#6b7280' }}>
          Log in as a student to RSVP.
        </div>
      )}
    </div>
  );
};

export default EventDetail;
