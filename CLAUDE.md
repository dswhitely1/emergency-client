# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Emergency Electric INC — a React client application for an electrical services company. Includes a public landing page, user authentication, user dashboard (profile, employment, education, references), and an admin dashboard.

## Commands

- **Dev server:** `npm run dev` (Vite)
- **Build:** `npm run build` (Vite)
- **Lint:** `npm run lint` (ESLint 9, flat config)
- **Preview production build:** `npm run preview`

No test framework is configured.

## Architecture

### Stack
- React 16 with JSX (no TypeScript)
- Vite 7 build tool
- Redux 4 with react-redux for state management
- React Router v5 (`react-router-dom` with `<Switch>`, `<Route>`)
- Material-UI v4 (`@material-ui/core`, `@material-ui/icons`)
- styled-components for additional styling
- Axios for HTTP requests
- SCSS for global styles (`src/index.scss`)

### Entry Points
- `index.html` → `src/main.jsx` → `src/components/App.jsx`
- `src/main.jsx` sets up Redux `<Provider>` and React Router `<BrowserRouter>`

### State Management Pattern
Redux store is in `src/store/`. Each domain has its own folder with three files:
- `*Types.js` — action type constants
- `*Reducer.js` — reducer
- `use*Actions.jsx` — custom hook that returns action dispatchers (uses `useDispatch`)

All domain action hooks are aggregated in `src/store/useActions.jsx` and provided to the component tree via `src/contexts/ActionsContext.jsx`. Components consume actions through this context rather than dispatching directly.

**Redux domains:** auth, navigation, profile, employment, education, references, admin, weather, messages

### Routing
Defined in `src/components/App.jsx`:
- `/` — public landing page (`HomePage`)
- `/login`, `/register` — auth (same `Login` component, register via prop)
- `/dashboard` — authenticated users (`PrivateRoute`)
- `/admin/dashboard` — admin users (`AdminRoute`)

### API Configuration
`src/store/utils/axiosConfig.js` exports `axiosNoAuth()` and `axiosWithAuth(token)` axios instances. Base URL comes from `import.meta.env.REACT_APP_BASE_URL`.

### ESLint
Flat config (`eslint.config.js`). The `no-unused-vars` rule ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).

### Component Conventions
- Reusable UI components use `*.component.jsx` / `*.styles.jsx` naming in their own folders under `src/components/`
- Page-level components are plain `*.jsx` files grouped by feature
- MUI theme is defined in `src/components/styles/theme.js`
