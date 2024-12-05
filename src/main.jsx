import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../src/pages/login/index';
import Register from '../src/pages/register/index';
import Calendar from '../src/pages/calendar/index';
import Inicio from '../src/pages/inicio/index';
import Adm from '../src/pages/adm/index';
import AdmLogin from '../src/pages/admlogin/index.jsx';

const router = createBrowserRouter([
  {
    path: '/calendar',
    element: <Calendar />,
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Inicio />,
  },

  {
    path: '/adm',
    element: <Adm />,
  },

  {
    path: '/admlogin',
    element: <AdmLogin />,
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);