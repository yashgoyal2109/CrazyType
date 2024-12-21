import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './Signup.jsx';
import Login from './Login.jsx'
import Results from './Results.jsx';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
    element:<Login />
  },
  {
    path:"/results",
    element:<Results />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
