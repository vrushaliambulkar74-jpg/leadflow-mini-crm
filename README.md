# LeadFlow | Mini CRM

A full-stack Lead Management System built with React, Vite, Tailwind CSS, Node.js, Express and MongoDB.

## Features

- Responsive dashboard with live lead KPIs and pipeline overview
- Lead CRUD: create, view, edit, change status and delete
- Search by name, email, company, phone or lead ID
- Filter by status and source; sort by newest, oldest or name
- JWT authentication with register, login and logout
- Server-side validation and consistent API error responses
- MongoDB persistence using Mongoose
- Seed script with eight realistic demo leads
- API reference page inside the application

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS, custom CSS |
| Icons | Lucide React |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |

## Requirements

- Node.js 18+
- npm 9+
- MongoDB Community Server or MongoDB Atlas connection string

## Setup

### 1. Install dependencies

From the project root:

```bash
npm run install:all
```

### 2. Configure the backend

Copy `server/.env.example` to `server/.env` and update the values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/leadflow
JWT_SECRET=replace-this-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

### 3. Seed demo data (optional)

```bash
npm run seed --prefix server
```

This creates a demo admin and eight sample leads.

**Demo login**
- Email: `pranav@leadflow.io`
- Password: `Admin@2026`

The seed script is safe to rerun for the demo account and sample records. Change the password and JWT secret before using this outside a demo.

### 4. Run the application

From the project root:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

## API endpoints

All `/api/leads` routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/leads` | List leads (`q`, `status`, `source`, `sort`) |
| POST | `/api/leads` | Create lead |
| GET | `/api/leads/:id` | Get one lead |
| PUT | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |

## Project structure

```text
leadflow-mini-crm/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   └── ...
├── server/
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   └── index.js
│   └── ...
└── README.md
```

## Architecture

The React client communicates with the Express REST API using JSON over HTTP. Login returns a signed JWT; the client sends it as a bearer token for protected lead endpoints. Express validates requests, checks authentication, and uses Mongoose models to read and write MongoDB documents. The database stores each lead's name, email, phone, company, source, status and creation date, with optional notes and deal value for useful CRM context.

## Production notes

- Set a strong unique `JWT_SECRET`.
- Use HTTPS and secure cookie-based token storage for production.
- Configure MongoDB Atlas network access and credentials securely.
- Add rate limiting, email verification, password reset and role-based permissions before public deployment.
- Never commit `.env`.
