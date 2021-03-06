import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import auth from './auth/authSlice'
import tweetGrid from './tweet-grid/tweetGridSlice'
import { authServiceSlice } from '../services/auth'
import { twitterServiceSlice } from '../services/twitter'
import { folderingServiceSlice } from '../services/foldering'

const persistConfig = {
  key: 'root',
  storage,
}
const reducers = combineReducers({
  auth,
  tweetGrid,
  [authServiceSlice.reducerPath]: authServiceSlice.reducer,
  [twitterServiceSlice.reducerPath]: twitterServiceSlice.reducer,
  [folderingServiceSlice.reducerPath]: folderingServiceSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authServiceSlice.middleware)
      .concat(twitterServiceSlice.middleware),
})

export const persistor = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
