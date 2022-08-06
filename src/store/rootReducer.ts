import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import isAutorizedReducer from './slices/isAutorized';
import fetchContactsReducer from './slices/fetchContacts';
import deletedContactReducer from './slices/deleteContact';
import addContactReducer from './slices/addContact';
import editContactReducer from './slices/editContact';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

export const rootReducer = combineReducers({
  isAutorizedReducer,
  fetchContactsReducer,
  deletedContactReducer,
  addContactReducer,
  editContactReducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
