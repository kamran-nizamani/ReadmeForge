# ReadmeForge

ReadmeForge is a full-stack project for generating polished `README.md` content through a responsive frontend form experience. It includes a React + Vite frontend and an Express backend for supporting API-powered features.

## Project Overview

- `frontend/` - React + Vite app for building README content interactively.
- `backend/` - Express API server with routes for GitHub data, bio generation, snapshot capture, and README generation.
- Root workspace uses npm workspaces to run frontend and backend together.

## Features

- Live README markdown preview
- Skill and social link selection
- GitHub and stats widget toggles
- Download generated `README.md`
- Frontend and backend can run in parallel via workspace scripts

## Quick Start

### Requirements

- Node.js 20+ or compatible version
- npm

### Install dependencies

```bash
cd c:\Users\Kamran\Desktop\REAdME
npm install
```

### Run both frontend and backend

```bash
npm run dev
```

### Run frontend only

```bash
npm run start:frontend
```

### Run backend only

```bash
npm run start:backend
```

## Frontend

The frontend is located in `frontend/` and includes:

- React 18
- Vite
- Tailwind CSS
- `marked` for markdown rendering

Useful commands:

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## Backend

The backend is located in `backend/` and includes:

- Express
- CORS
- Dotenv
- Puppeteer
- Jest for tests

Useful commands:

```bash
cd backend
npm run start
npm run dev
npm test
```

## Repository Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   ├── Dockerfile.dev
│   ├── jest.config.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package.json
├── package-lock.json
└── docker-compose.yml
```

## Notes

- The root workspace uses npm workspaces to coordinate frontend and backend development.
- The backend serves static assets from `public/` and exposes API routes under `/api/`.
- The frontend is a standalone React app built with Vite.

## License

This repository is currently private and does not include a license file.
