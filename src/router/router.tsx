import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import CategoriesPage from '../pages/CategoriesPage';
import TasksPage from '../pages/TasksPage';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'signup',
        element: <RegistrationPage />,
      },
      {
        path: 'signin',
        element: <LoginPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
    ],
  },
]);

export default router;
