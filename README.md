# Hospital Management System

A secure, role-based Hospital Management System designed to handle user authentication, appointment scheduling, and administrative oversight.

## 🚀 Tech Stack
* **Frontend:** React.js, Axios, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Auth:** JSON Web Tokens (JWT)

## 🏗️ Architecture & Logic

### Backend
* **Models:** Data schemas are defined using Mongoose to ensure consistent data structures for `Users` and `Appointments`.
* **Routes:** Logic is modularized into dedicated files:
    * `auth.js`: Handles registration and login.
    * `users.js`: Manages user data.
    * `appointments.js`: Manages scheduling operations.
* **Middleware:** Security is enforced via middleware that verifies JWT tokens and checks user roles (`admin` vs `user`) to restrict access to sensitive routes.

### Frontend
* **API Service:** A centralized `api.js` file using `axios.create` provides a clean base URL for all HTTP requests.
* **Auth Service:** `auth.js` manages local storage for JWT tokens and user roles, providing helper functions like `login`, `logout`, `getToken`, and `getRole`.
* **Protected Routes:** A wrapper component `ProtectedRoute.js` handles client-side security by redirecting unauthorized users and restricting non-admin users from admin-only dashboards.

## 📂 File Structure
```text
hospital-app/
├── hospital-backend/
│   ├── models/        # MongoDB Schemas
│   ├── routes/        # API Endpoints
│   └── server.js      # Main Server entry point
└── hospital-frontend/
    ├── src/
    │   ├── pages/     # Dashboard, Login
    │   ├── routes/    # ProtectedRoute component
    │   └── services/  # API and Auth logic
