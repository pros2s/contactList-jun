import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Contacts from '../pages/contacts/Contacts';

import Login from '../pages/login/Login';
import NotFound from '../pages/NotFound';


export interface RouteElement {
  path: string;
  element: ReactNode;
}

export const publicRoutes: Array<RouteElement> = [
  { path: '/', element: <Navigate replace to='/login' /> },
  { path: '/login', element: <Login /> },
  { path: '/*', element: <NotFound /> },
];

export const privateRoutes: Array<RouteElement> = [
  { path: '/', element: <Navigate replace to='/contacts' /> },
  { path: '/contacts', element: <Contacts /> },
  { path: '/login', element: <Login /> },
  { path: '/*', element: <NotFound /> },
];
