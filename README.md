# BusTracker JO (Web) 🚌

A modern React Web Application for tracking buses in Jordan.

## Features
- **Real-time Bus Tracking**: Simulate live bus movement on the map.
- **OpenStreetMap**: Fully free map integration using Leaflet.
- **RTL Support**: Native Arabic interface.
- **Responsive**: Works on Mobile and Desktop.

## Tech Stack
- React 18
- TypeScript
- Vite
- Zustand (State Management)
- Leaflet / React-Leaflet (Maps)

## Setup & Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```
   
3. **Build for Production**
   ```bash
   npm run build
   ```
   The output will be in the `dist` folder, ready to deploy to Vercel, Netlify, or any static host.

## Project Structure
- `src/components`: UI Components (TerminalCard, MapOverlay).
- `src/constants`: Static data.
- `src/pages`: Main pages.
- `src/services`: Simulation logic.
- `src/store`: Bus state management.
