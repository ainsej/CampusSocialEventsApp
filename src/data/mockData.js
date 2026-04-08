// Mock data for CampusSocialEventsApp

export const events = [
  {
    id: '1',
    title: 'Chess Club Weekly Meeting',
    description: 'Join us for our weekly chess club meeting. All skill levels welcome!',
    date: '2026-04-10',
    time: '18:00',
    location: 'Student Center Room 101',
    category: 'Club Meeting',
    organizerId: 'a1',
    attendees: ['s1', 's2', 's3']
  },
  {
    id: '2',
    title: 'Spring Career Fair',
    description: 'Meet recruiters from top companies and explore job opportunities.',
    date: '2026-04-12',
    time: '10:00',
    location: 'Main Gymnasium',
    category: 'Career',
    organizerId: 'a2',
    attendees: ['s2', 's4', 's5', 's6']
  },
  {
    id: '3',
    title: 'Guest Lecture: The Future of AI',
    description: 'Dr. Jane Smith discusses advancements in artificial intelligence.',
    date: '2026-04-15',
    time: '15:00',
    location: 'Science Hall Auditorium',
    category: 'Lecture',
    organizerId: 'a2',
    attendees: ['s1', 's3', 's5']
  },
  {
    id: '4',
    title: 'Intramural Soccer Finals',
    description: 'Come cheer for your favorite team in the soccer finals!',
    date: '2026-04-18',
    time: '17:30',
    location: 'Athletic Field',
    category: 'Sports',
    organizerId: 'a1',
    attendees: ['s2', 's4', 's6']
  },
  {
    id: '5',
    title: 'Open Mic Night',
    description: 'Show off your talent or enjoy performances by fellow students.',
    date: '2026-04-20',
    time: '19:00',
    location: 'Campus Cafe',
    category: 'Arts',
    organizerId: 'a2',
    attendees: ['s1', 's5', 's6']
  },
  {
    id: '6',
    title: 'Environmental Club: Park Clean-Up',
    description: 'Help us keep our local park clean and green! Supplies provided.',
    date: '2026-04-22',
    time: '09:00',
    location: 'Riverside Park',
    category: 'Volunteer',
    organizerId: 'a1',
    attendees: ['s3', 's4', 's5']
  },
  {
    id: '7',
    title: 'Board Game Night',
    description: 'Relax and play your favorite board games with friends.',
    date: '2026-04-25',
    time: '20:00',
    location: 'Dormitory Lounge',
    category: 'Social',
    organizerId: 'a2',
    attendees: ['s1', 's2', 's6']
  },
  {
    id: '8',
    title: 'Coding Bootcamp: Web Dev Basics',
    description: 'A hands-on workshop for beginners to learn web development.',
    date: '2026-04-28',
    time: '14:00',
    location: 'Computer Lab 3',
    category: 'Workshop',
    organizerId: 'a1',
    attendees: ['s3', 's4', 's5', 's6']
  }
];

export const users = [
  {
    id: 's1',
    name: 'Emily Chen',
    email: 'emily.chen@college.edu',
    role: 'student',
    rsvps: ['1', '3', '5', '7']
  },
  {
    id: 's2',
    name: 'Michael Lee',
    email: 'michael.lee@college.edu',
    role: 'student',
    rsvps: ['1', '2', '4', '7']
  },
  {
    id: 's3',
    name: 'Priya Patel',
    email: 'priya.patel@college.edu',
    role: 'student',
    rsvps: ['1', '3', '6', '8']
  },
  {
    id: 's4',
    name: 'David Kim',
    email: 'david.kim@college.edu',
    role: 'student',
    rsvps: ['2', '4', '6', '8']
  },
  {
    id: 's5',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@college.edu',
    role: 'student',
    rsvps: ['2', '3', '5', '6', '8']
  },
  {
    id: 's6',
    name: 'James Wilson',
    email: 'james.wilson@college.edu',
    role: 'student',
    rsvps: ['2', '4', '5', '7', '8']
  },
  {
    id: 'a1',
    name: 'Olivia Brown',
    email: 'olivia.brown@college.edu',
    role: 'orgAdmin',
    rsvps: ['1', '4', '6', '8']
  },
  {
    id: 'a2',
    name: 'Ethan Smith',
    email: 'ethan.smith@college.edu',
    role: 'orgAdmin',
    rsvps: ['2', '3', '5', '7']
  }
];
