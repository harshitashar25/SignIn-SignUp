



https://github.com/user-attachments/assets/f122e3aa-ac87-4ae8-99b9-be29c3675e27




A **full-stack web application** featuring **Google OAuth authentication**, a React-based frontend, and a Node.js/Express backend with MongoDB integration.

---

## Features

* Google OAuth 2.0 authentication
* JWT-based session management
* Protected dashboard for authenticated users
* Modern React frontend with TypeScript
* Custom Dither animation component
* RESTful API backend with Express and MongoDB

---

## Directory Structure

```
i10ai/

├── backend/
│   ├── package.json
│   ├── playground-1.mongodb.js
│   ├── server.js
│   ├── config/
│   │   └── passport.js
│   ├── middleware/
│   │   └── verifyToken.js
│   ├── models/
│   │   └── User.js
│   └── routes/
│       ├── auth.js
│       └── user.js
└── frontend/
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── public/
    │   ├── favicon.ico
    │   ├── google.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.test.tsx
        ├── App.tsx
        ├── Dither.d.ts
        ├── Dither.tsx
        ├── index.css
        ├── index.tsx
        ├── logo.svg
        ├── react-app-env.d.ts
        ├── reportWebVitals.ts
        ├── setupTests.ts
        ├── components/
        │   └── Dashboard.tsx
        └── pages/
            └── Login.tsx
```

---

## Getting Started

### Prerequisites

* Node.js (v16+ recommended)
* npm
* MongoDB

---

### Backend Setup

```bash
cd backend
npm install
```

1. Create a `.env` file with the following:

```env
PORT=5001
MONGO_URI=<your_mongo_uri>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CALLBACK_URL=http://localhost:5001/auth/google/callback
FRONTEND_URL=http://localhost:3000
```

2. Start the backend server:

```bash
npm start
```

The backend will run at: `http://localhost:5001`

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run at: `http://localhost:3000`

---

## Authentication Flow

1. User logs in using Google OAuth.
2. The backend authenticates the user and issues a JWT.
3. The JWT is stored in the browser's localStorage.
4. Protected routes (such as `/dashboard`) require a valid JWT for access.

---

## Scripts

### Backend

* `npm start` — Starts the Express backend server

### Frontend

* `npm start` — Runs the React development server
* `npm test` — Runs frontend test suite

---

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Passport.js
* JSON Web Tokens (JWT)

---

## License

This project is licensed under the MIT License.


