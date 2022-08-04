import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Contacts from './pages/Contacts';
import Login from './pages/Login';
import NotFound from './pages/NotFound';


const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navigate replace to='/login'/> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/contacts' element={ <Contacts /> }/>
        <Route path='/*' element={ <NotFound /> }/>
      </Routes>
    </BrowserRouter>
  );
};


export default App;
