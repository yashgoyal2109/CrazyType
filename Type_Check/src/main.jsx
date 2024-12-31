import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './Signup.jsx';
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Leaderboard from './LeaderBoard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <h1>Not found</h1>,
  },
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
