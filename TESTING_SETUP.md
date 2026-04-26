Add these dev dependencies:

npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

Update package.json scripts:

"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest",
  "test:run": "vitest run",
  "test:ui": "vitest --ui"
}

Files included in this folder:
- vitest.config.ts
- src/test/setupTests.ts
- src/context/__tests__/AuthContext.test.tsx
- src/context/__tests__/EventContext.test.tsx
- src/components/__tests__/EventList.test.tsx
- src/components/__tests__/StaticComponents.test.tsx
- src/pages/__tests__/Pages.test.tsx
