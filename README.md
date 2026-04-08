# CampusSocialEventsApp

## Project Overview
CampusSocialEventsApp is a React + Vite web application for college students to browse upcoming campus events, RSVP, and receive notifications. Organization admins can create and edit events. The app uses hardcoded mock data for events and includes authentication and event management features.

## Tech Stack
- **React** (with TypeScript)
- **Vite** (build tool)
- **React Router** (routing)
- **Hardcoded mock data** (for events)

## How to Install and Run
1. Clone the repository or download the project files.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the app in your browser at the URL provided in the terminal (usually http://localhost:5173).

## Folder Structure Overview
```
src/
  components/      # Shared UI components (Navbar, EventCard)
  pages/           # Page components (Home, EventDetail, OrgDashboard, Login)
  context/         # React Context for Auth and Events
  data/            # Mock data for events
```

## Team Members
- [Add your team members here]
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# CampusSocialEventsApp
