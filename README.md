# CampusSocialEventsApp

## Overview
CampusSocialEventsApp is a React + Vite web app where students can browse upcoming campus events, view event details, RSVP to events, and receive reminder notifications. Organization admins can manage (edit) their own events via an organizer dashboard. The app uses hardcoded mock data (no backend).

## Features Implemented

### Authentication (Mock)
- Login by email (no password) using hardcoded mock users.
- Role-based behavior:
  - `student`: can RSVP to events
  - `orgAdmin`: can access the organizer dashboard

### Event Browsing
- Event list with:
  - Category filter
  - Search by event title
- Responsive layout:
  - Desktop/tablet: 2-column layout (filters left, event cards right)
  - Mobile: single-column stacked layout

### Event Details + RSVP
- Click an event to open the Event Detail page.
- RSVP button on the detail page:
  - Adds the event to the student’s RSVP list (stored in Auth context)
  - Updates RSVP count (attendee count) on both the list card and detail page
- Notifications:
  - On RSVP, the app requests browser notification permission (if supported)
  - Schedules a reminder notification (1 hour before the event start time)
  - Note: reminders only fire while the page is open (no service worker / backend)

### Organizer Dashboard (`/dashboard`)
- Access control:
  - Only `orgAdmin` users can access it
  - Others are redirected to `/login`
- Shows only events owned by the logged-in organizer
- Each event shows:
  - Title
  - Date
  - RSVP count
- Edit flow:
  - Edit button opens a pre-filled form
  - Save updates the event

### UI Improvements
- Styled navbar with tab-like links (active state)
- Event cards displayed as card-style blocks

## Tech Stack
- React + TypeScript
- Vite
- React Router
- React Context (Auth + Events)
- Hardcoded mock data

## How to Run

### Prerequisites
- Node.js (recommended: latest LTS)
- npm

### Install
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Build
```bash
npm run build
```

## Test Accounts (Mock Users)

### Org Admins (can access `/dashboard`)
- `olivia.brown@college.edu` (Organizer `a1`)
- `ethan.smith@college.edu` (Organizer `a2`)

### Students (can RSVP, cannot access `/dashboard`)
- `emily.chen@college.edu`
- `michael.lee@college.edu`
- `priya.patel@college.edu`
- `david.kim@college.edu`
- `sophia.martinez@college.edu`
- `james.wilson@college.edu`

## Prompting Workflow
We used an iterative prompting workflow where each feature was built in small, testable increments:
1. Define the goal clearly (page/feature, required behavior, access rules, UI requirements).
2. Identify where it fits (routes, contexts, mock data, shared components).
3. Implement the smallest working version (e.g., render the page + guard logic).
4. Add required behavior (filtering, editing, RSVP updates, notifications).
5. Verify via manual UI testing and build/typecheck (`npm run build`).
6. Refine UI (layout, responsive behavior, navbar styling) once core behavior was correct.

Prompts were written to be specific (role-based access, filtering rules, required fields, and route additions) and adjusted based on observed behavior during testing.

## Team Member Roles & Rotation

Roles:
- **Prompter**: owns the prompt for the week (requirements clarity, scope, acceptance criteria)
- **Prompt Builder**: breaks requirements into implementable steps and proposes prompt refinements
- **Tester**: verifies functionality, edge cases, and reports issues

### Week 1
- Prompter: **Noah**
- Prompt Builder: **Ainslee**
- Tester: **Kennedy**

### Week 2
- Prompter: **Ainslee**
- Prompt Builder: **Kennedy**
- Tester: **Noah**

### Week 3
- Prompter: **Kennedy**
- Prompt Builder: **Noah**
- Tester: **Ainslee**

## Notes / Limitations
- No backend/database: all data is in mock files and React state.
- Notifications use the browser Notification API:
  - Requires user permission
  - Scheduled reminders only work while the app is open (no background push).
