import { JSXElementConstructor, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { persistedReducer } from '../store/rootReducer';


interface WrapperProps {
  children?: React.ReactNode;
}

export const renderWithProviders = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  initialState = {},
) => {
  const store = configureStore({ reducer: persistedReducer, preloadedState: initialState });

  const Wrapper = ({ children }: WrapperProps) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return rtlRender(ui, { wrapper: Wrapper });
};
