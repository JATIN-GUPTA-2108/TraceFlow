# TraceFlow Backend

Production-style backend skeleton for a multi-session API tracking and mapping system.

## Features

- Express REST API with modular routes/controllers
- MongoDB models for sessions, mappings, and logs
- Mapping engine with transform registry
- Manual log ingestion + replay endpoint
- Centralized error handling middleware

## Project Structure

```
.
├── src
│   ├── app.js
│   ├── server.js
│   ├── config
│   ├── core
│   ├── middlewares
│   ├── models
│   └── modules
│       ├── sessions
│       ├── mappings
│       └── logs
├── .env.example
├── package.json
└── server.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment config:

```bash
cp .env.example .env
```

3. Start service:

```bash
npm start
```

## API Endpoints

- `GET /health`
- `POST /sessions`
- `GET /sessions`
- `POST /mappings`
- `GET /mappings`
- `POST /mappings/apply`
- `POST /logs/manual`
- `GET /logs?sessionId=`
- `GET /logs/:id`
- `POST /logs/replay/:id`
