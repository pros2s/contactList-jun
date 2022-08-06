import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import isAutorizedReducer from './slices/isAutorized';
import fetchContactsReducer from './slices/fetchContacts';
import deletedContactReducer from './slices/deleteContact';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

export const rootReducer = combineReducers({
  isAutorizedReducer,
  fetchContactsReducer,
  deletedContactReducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
