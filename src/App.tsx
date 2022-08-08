import { FC } from 'react';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { useTypedSelector } from './hooks/useTypedSelector';

import { privateRoutes, publicRoutes } from './routes/routes';
import { isAutorizedSelelector } from './store/slices/isAutorized';


const history = createBrowserHistory();

const App: FC = () => {
  const { isAutorized } = useTypedSelector(isAutorizedSelelector);

  
  return (
    <div data-testid='app'>
      <HistoryRouter history={history}>
        <Routes>
          {isAutorized
            ? privateRoutes.map(({ path, element }) => (
                <Route path={path} element={element} key={path} />
              ))
            : publicRoutes.map(({ path, element }) => (
                <Route path={path} element={element} key={path} />
              ))}
        </Routes>
      </HistoryRouter>
    </div>
  );
};


export default App;
