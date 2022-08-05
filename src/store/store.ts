import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import isAutorizedReducer from './slices/isAutorized';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  isAutorizedReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export function store(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
}

export const initStore = store();
export const persistor = persistStore(initStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type TypedDispatch = AppStore['dispatch'];
