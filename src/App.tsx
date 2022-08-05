import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTypedSelector } from './hooks/useTypedSelector';

import { privateRoutes, publicRoutes } from './routes/routes';
import { isAutorizedSelelector } from './store/slices/isAutorized';


const App: FC = () => {
  const { isAutorized } = useTypedSelector(isAutorizedSelelector);

  return (
    <div data-testid='app'>
      <BrowserRouter>
        <Routes>
          {
            isAutorized
              ? privateRoutes.map(({ path, element }) => <Route path={path} element={element} key={path}/>)
              : publicRoutes.map(({ path, element }) => <Route path={path} element={element} key={path}/>)
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;
