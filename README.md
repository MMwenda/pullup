# PullUp 📍

> *Don't wait for plans. Post where you're at, and let people pull up.*

PullUp is a location-based social app that lets you create and discover real-life hangouts around you. No existing friend group needed — just post what you're doing, where you are, and let others nearby join in.

---

## The Idea

Socializing in cities is harder than it looks. Everyone's on their phone but nobody's actually linking. PullUp solves that by making spontaneous, low-pressure meetups easy — you post a hangout on the map, others see it, they pull up. Simple.

---

## Features (MVP)

- 🗺️ **Map-based discovery** — See live hangouts pinned on a map around you
- 📌 **Create hangouts** — Click anywhere on the map to post an event with a title, description, time and location
- 🔐 **Authentication** — Sign in with Google or register with email and password
- 📬 **Join requests** *(OTW)* — Send a message to the host to join their hangout
- 👤 **User profiles** *(OTW)* — See who's behind the hangout before you pull up

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Map | Mapbox GL JS |
| Database | MongoDB |
| ODM | Mongoose |
| Auth | NextAuth v5 (Google + Credentials) |
| Password Hashing | bcryptjs |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Mapbox account
- Google OAuth credentials

### Installation

```bash
git clone https://github.com/yourusername/pullup.git
cd pullup
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=your_auth_secret
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in.

---

## Project Structure

```
/app
  /api
    /events       → GET and POST hangouts
    /auth         → NextAuth handler + register endpoint
  /auth
    /signin       → Sign in page
    /register     → Register page
  /components
    Map.tsx           → Mapbox map with event pins
    CreateEventForm.tsx → Form to post a hangout
  /lib
    mongoose.ts       → MongoDB connection
    auth.ts           → NextAuth config
    /models
      Event.ts        → Event schema
      User.ts         → User schema
```
---


## About

Built by [@MMwenda](https://github.com/MMwenda) — a developer who got tired of having nowhere to be and decided to build the solution.

*Still under construction. But the foundation ni safi.* 🔨
