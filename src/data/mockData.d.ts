// TypeScript declaration for mockData.js
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  organizerId: string;
  attendees: string[];
}

export declare const events: Event[];