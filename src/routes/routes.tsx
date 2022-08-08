import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Contacts from '../pages/contacts/Contacts';
import LoginPage from '../pages/login/Login';

import NotFound from '../pages/notFound/NotFound';


export interface RouteElement {
  path: string;
  element: ReactNode;
}

export const publicRoutes: Array<RouteElement> = [
  { path: '/', element: <Navigate replace to='/login' /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/*', element: <NotFound /> },
];

export const privateRoutes: Array<RouteElement> = [
  { path: '/', element: <Navigate replace to='/contacts/1' /> },
  { path: '/contacts', element: <Navigate replace to='/contacts/1' /> },
  { path: '/contacts/:id', element: <Contacts /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/*', element: <NotFound /> },
];
