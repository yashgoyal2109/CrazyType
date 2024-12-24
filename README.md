# DevType

DevType is a modern typing speed testing application inspired by platforms like MonkeyType. It allows users to test and improve their typing speed with a user-friendly interface and provides detailed analytics to track performance over time.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [API Endpoints](#api-endpoints)
5. [Acknowledgments](#acknowledgments)

---

## Features

- **Typing Test:**
  - Randomized word sequences for each test.
  - Accurate words-per-minute (WPM) and accuracy calculations.

- **User Authentication:**
  - Signup/login functionality.
  - JWT-based secure authentication.

- **Profile Management:**
  - View past test performance.
  - Update user details.

- **Responsive Design:**
  - Optimized for both desktop and mobile devices.

---

## Tech Stack

- **Frontend:**
  - React.js
  - React Router DOM
  - Tailwind CSS
  - Vite (for fast builds and development)

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB (with Mongoose for ODM)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/devtype.git
   ```

2. Navigate to the project directory:
   ```bash
   cd devtype
   ```

3. Install dependencies:
   - Frontend:
     ```bash
     cd client
     npm install
     ```
   - Backend:
     ```bash
     cd server
     npm install
     ```

4. Set up environment variables:
   - Create `.env` files in the `client` and `server` directories.
   - Backend `.env`:
     ```env
     PORT=5000
     DB_CONNECTION_STRING=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Frontend `.env`:
     ```env
     VITE_API_URL=http://localhost:5000
     ```

5. Run the application:
   - Backend:
     ```bash
     cd server
     npm start
     ```
   - Frontend:
     ```bash
     cd client
     npm run dev
     ```

6. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

## API Endpoints

### Authentication
- `POST /api/auth/login`: User login and JWT token issuance.
- `POST /api/auth/signup`: New user registration.

### Typing Tests
- `GET /api/tests`: Retrieve past test results for a user.
- `POST /api/tests`: Submit a new typing test result.

### User Profile
- `GET /api/users/:id`: Retrieve user profile details.
- `PUT /api/users/:id`: Update user profile information.

---


## Acknowledgments

- Inspired by [MonkeyType](https://monkeytype.com).
- Built with love using MERN stack.
