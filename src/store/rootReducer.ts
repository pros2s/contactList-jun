import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import isAutorizedReducer from './slices/isAutorized';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

export const rootReducer = combineReducers({
  isAutorizedReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
