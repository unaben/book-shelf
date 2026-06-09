# Shelfie

A mobile app for managing your personal book collection. Built with React Native, Expo, and Appwrite.

---

## What it does

- Create an account and log in
- Add books to your shelf with a title, author, and description
- View, edit, and delete books
- Real-time updates via Appwrite subscriptions
- Light and dark mode support

---

## Tech stack

- [Expo](https://expo.dev) (SDK 56) with Expo Router for file-based navigation
- [React Native](https://reactnative.dev) 0.85
- [Appwrite](https://appwrite.io) for auth, database, and real-time events
- TypeScript throughout

---

## Project structure

```
src/
├── app/                  # Screens (Expo Router file-based routing)
│   ├── index.tsx         # Home screen
│   ├── (auth)/           # Login and register screens
│   └── (dashboard)/      # Protected tab screens: books, profile, create
├── components/           # UI components grouped by feature
├── context/              # AuthContext and BookContext
├── hooks/                # useTheme, useHandleBack, useOrientation, etc.
├── lib/                  # Appwrite client setup
├── types/                # Shared TypeScript interfaces
└── constants/            # Colors and spacing tokens
```

---

## Getting started

### Prerequisites

- Node.js 18+
- Expo CLI — `npm install -g expo-cli`
- An [Appwrite](https://appwrite.io) project with a `books` collection

### Install

```bash
git clone <your-repo-url>
cd react_native_tut
npm install
```

### Appwrite setup

The Appwrite config lives in `src/lib/appwrite.ts`. Update the following to point to your own project:

```ts
client
  .setProject("YOUR_PROJECT_ID")
  .setEndpoint("YOUR_APPWRITE_ENDPOINT")
  .setPlatform("YOUR_PLATFORM_ID");
```

Your `books` collection needs these fields:

| Field         | Type   |
|---------------|--------|
| `title`       | string |
| `author`      | string |
| `description` | string |
| `userId`      | string |

### Run

```bash
# Start dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## Authentication

Auth is handled by Appwrite's email/password sessions. The `AuthContext` restores the session on app boot and exposes `login`, `register`, and `logout`. All dashboard routes are protected by `ProtectDashboardRoute`, which redirects unauthenticated users to the home screen.

---

## Notes

- The app is portrait-only
- Dark/light mode follows the system setting
- Real-time book updates use Appwrite's `client.subscribe()` — no manual refresh needed after create/update/delete