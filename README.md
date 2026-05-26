# Sneha Patil — Cinderella Portfolio

A single-page fairy-tale portfolio built with **React** and **plain CSS**. Dark enchanted night sky, glowing gold magic, glass elegance, and scroll-triggered animations via `IntersectionObserver`.

## Tech Stack

- React (Vite)
- Plain CSS only — no Tailwind, no UI libraries, no styled-components
- `IntersectionObserver` for scroll reveals
- Canvas starfield & custom SVG illustrations

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx
├── index.css
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Timeline.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── MagicCursor.jsx
│   ├── Starfield.jsx
│   └── ScrollProgress.jsx
└── hooks/
    └── useScrollReveal.js
```

## Customize

- Social links: `src/components/Footer.jsx`
- Bio & stats: `src/components/About.jsx`
- Skills & levels: `src/components/Skills.jsx`
- Projects: `src/components/Projects.jsx`
- Timeline milestones: `src/components/Timeline.jsx`
