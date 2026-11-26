# LeadFlow Mini CRM

A responsive Lead Management System (Mini CRM) for managing potential customers, tracking lead progress, and organizing follow-ups.

## Live Demo

- **Frontend:** https://leadflow-client-xqi6.onrender.com
- **Backend health check:** https://leadflow-api-17nv.onrender.com/api/health

> The backend hosted on Render's free plan may take a short time to wake up after inactivity.

## Features

- User registration and login
- JWT-based authentication
- Dashboard with lead statistics
- Create, view, update, and delete leads
- Lead status tracking: New, Contacted, Interested, Converted, and Lost
- Search and filter leads
- Responsive user interface

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios for API communication
- Recharts for dashboard charts
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Helmet, CORS, and Morgan middleware

### Deployment
- Render for frontend and backend hosting
- MongoDB Atlas for the cloud database

## Project Structure

```text
leadflow-mini-crm/
├── client/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── screenshots/
├── .gitignore
└── README.md
```

## Requirements

- Node.js (LTS version recommended)
- npm
- MongoDB database (local MongoDB or MongoDB Atlas)
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd leadflow-mini-crm
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with the repository's GitHub URL.

### 2. Configure and run the backend

From the project root:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
```

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: A long, private random secret used to sign authentication tokens.
- `CLIENT_URL`: Frontend origin allowed by the backend during local development.

Start the backend:

```bash
npm start
```

The API should be available at `http://localhost:5000`.

### 3. Configure and run the frontend

Open a **second terminal** in the project root:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal, usually `http://localhost:5173`.

### 4. Build the frontend for production

From the `client` folder:

```bash
npm run build
```

The production build is generated in `client/dist`.

## Environment Variables and Security

Do not commit real `.env` files, database credentials, JWT secrets, or other private keys to GitHub. Commit `.env.example` files containing placeholder values only.

For the deployed application, configure these variables in the hosting provider dashboard.

**Backend service**
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL` – set this to the deployed frontend origin.

**Frontend service**
- `VITE_API_URL` – set this to the deployed backend API base URL, ending in `/api`.

Deployed frontend API base URL:

```text
https://leadflow-api-17nv.onrender.com/api
```

After changing a Vite environment variable in the hosting dashboard, rebuild/redeploy the frontend so the new value is included in the production bundle.

## Screenshots

Create a `screenshots/` folder in the repository and add screenshots such as:

1. `login.png` – Login page
2. `dashboard.png` – Main dashboard with lead metrics and charts
3. `leads.png` – Lead list with search and filters
4. `add-lead.png` – Add or edit lead form

To display a screenshot in this README after uploading it, use a relative Markdown image link:

```markdown
![Dashboard](screenshots/dashboard.png)
```

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get the authenticated user |
| GET | `/api/leads` | List leads |
| POST | `/api/leads` | Create a lead |
| GET | `/api/leads/:id` | Get a lead by ID |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |
| GET | `/api/health` | Check API health |

Protected lead routes require a valid JWT access token in the `Authorization: Bearer <token>` header.

## Architecture

The application uses a **client-server architecture**:

1. The React frontend runs in the browser and provides the login screen, dashboard, lead list, search, filters, and forms.
2. Axios sends HTTP requests from the frontend to the Express REST API.
3. The Node.js/Express backend handles authentication, validates requests, applies application logic, and exposes API endpoints.
4. Mongoose communicates with MongoDB to store and retrieve user and lead records.
5. JWT tokens are issued after successful login and are sent with protected API requests.
6. Render hosts the frontend and backend, while MongoDB Atlas provides the cloud database.

### Request Flow

```text
User
  |
  v
React + Vite Frontend
  |
  | HTTP requests (Axios)
  v
Node.js + Express REST API
  |
  | Mongoose
  v
MongoDB Atlas
```

## Notes for Evaluation

- Use the live frontend link above to access the deployed application.
- The backend health endpoint can be used to verify that the API is responding.
- If the demo account is unavailable in a fresh database, create an account using the **Create account** option, or follow the seed instructions included in the source code.
- On Render's free plan, the backend may spin down after inactivity and take a little time to respond to the first request.

## Author

**Vrushali Deepak Ambulkar**

LeadFlow Mini CRM – Recruitment Assignment
