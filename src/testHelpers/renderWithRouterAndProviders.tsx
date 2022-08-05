import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import { JSXElementConstructor, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistedReducer } from '../store/rootReducer';


interface WrapperProps {
  children?: React.ReactNode;
}

export function renderWithRouterAndProviders(
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  { route = '/', initialState = {} } = {},
) {
  window.history.pushState({}, 'Test page', route);
  const store = configureStore({ reducer: persistedReducer, preloadedState: initialState });

  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper });
}
