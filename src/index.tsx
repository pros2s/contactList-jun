import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { initStore, persistor } from './store/store';
import App from './App';

import './index.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={ initStore }>
      <PersistGate persistor={ persistor }>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
