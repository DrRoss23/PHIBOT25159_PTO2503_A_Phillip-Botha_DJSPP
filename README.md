# 🎙️ DJSPP – React Podcast Application (Production Version)

## 🌍 Live Demo

🔗 https://phibot-25159-pto-2503-a-phillip-bot.vercel.app/

---

## 📌 Project Overview

This project is a **fully featured React podcast application** built with **React 18 + Vite**.  
It began as a routing and context-based podcast explorer and evolved into a production-ready application featuring:

- Global persistent audio playback
- Favourites system with grouping and sorting
- Listening progress tracking (stretch goals completed)
- Recommended shows carousel
- Dark / Light theme system
- SPA routing with refresh safety
- LocalStorage persistence
- Deployment-ready configuration

This project demonstrates strong architectural planning, global state management, UI scalability, and production polish.

---

# 🚀 Core Features

## 🎵 Global Audio Player

- Single global `HTMLAudioElement`
- Persistent across navigation
- Play / Pause / Seek
- Stop & dismiss control
- Continues playback between routes
- Handles browser playback constraints safely

Audio is managed through a global `AudioPlayerContext` to ensure a single source of truth.

---

## ❤️ Favourites System

- Add / Remove episode favourites
- Grouped by show
- Sort A–Z / Z–A
- Sort by date added (Newest / Oldest)
- Displays episode metadata + artwork
- Clear all favourites
- Persisted via LocalStorage

Favourites are stored independently of API refetching to ensure instant rendering.

---

## ⏱️ Listening Progress (Stretch Goals Completed)

- Saves timestamp per episode
- Resume from exact position
- Marks episodes as Completed
- Resume indicator when progress ≥ 3 seconds
- Precise completion detection (within 1 second of duration)
- Global Reset Progress control
- Stored in `djs_listening_history` (LocalStorage)

Listening progress is integrated directly into the global audio system without introducing additional global layers.

---

## 🎠 Recommended Shows Carousel

- Horizontally scrollable
- Arrow navigation
- Forward-only looping for stability
- Randomised selection
- Genre badges mapped from ID → title
- Navigates correctly to show detail pages

Implemented without third-party carousel libraries to maintain clarity and control.

---

## 🌓 Theme System

- Light / Dark mode toggle
- Stored in LocalStorage
- Uses semantic CSS variables
- No hardcoded colours
- Fully responsive across all views

Theme switching updates root-level CSS tokens using `data-theme`.

---

# 🧠 Architecture Highlights

## Global State Layers

- `AudioPlayerContext` → Playback + Listening Progress
- `FavouritesContext` → Favourite management
- `ThemeContext` → UI theme
- `PodcastContext` → Core podcast data, filtering & sorting

This layered context structure avoids prop drilling and keeps responsibilities clearly separated.

---

## Episode Identity Strategy

To avoid duplicate playback state issues caused by shared API audio URLs, a globally unique episode key is generated:

```
showId-seasonIndex-episodeNumber
```

This key is used for:

- Playback comparison
- Listening progress storage
- Resume logic

---

## Browser Audio Handling

Playback logic safely handles:

- `audio.load()` before playback
- Promise-based `audio.play()`
- Metadata timing
- Resume race conditions

---

# 📄 Routing

Using **React Router DOM**:

- `/` – Home
- `/show/:id` – Show detail
- `/favourites` – Favourites library

SPA routing is configured for refresh safety in production.

---

# 🧱 Tech Stack

- React 18
- Vite
- React Router DOM
- Context API
- JavaScript (ES Modules)
- CSS Modules
- Podcast API → https://podcast-api.netlify.app

---

# 📂 Project Structure

```
src/
├── api/
├── components/
│   ├── UI/
│   ├── Podcasts/
│   └── Episodes/
├── context/
│   ├── AudioPlayerContext.jsx
│   ├── FavouritesContext.jsx
│   ├── ThemeContext.jsx
│   └── PodcastContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── ShowDetail.jsx
│   └── Favourites.jsx
├── styles/
├── App.jsx
└── main.jsx
```

---

# ⚙️ Setup & Running Locally

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

### Production build

```bash
npm run build
npm run preview
```

## https://phibot-25159-pto-2503-a-phillip-bot.vercel.app/

# 🌍 Deployment (Vercel)

1. Push project to GitHub
2. Import into Vercel
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add SPA rewrite configuration if needed

---

# 🧪 Completed User Stories

✅ Setup & Deployment  
✅ Global Audio Player  
✅ Favourites System  
✅ Recommended Carousel  
✅ Theme Toggle  
✅ Listening Progress (Stretch Goals)

---

# 👨‍💻 Author

**Phillip Botha**  
_React Developer Portfolio Project_

---

This project satisfies all DJSPP core requirements and stretch goals and demonstrates advanced state management, UI architecture, and production readiness.
