import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './rootReducer';
import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
//   }
  
const persistConfig = {
    key: "root",
    storage,
    blacklist: ['user', 'categories']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

//The dispatch action will trigger the middleware before the the action trigger the reducer
const middleWares = process.env.MODE_ENV === 'development' ? [logger,thunk] : [thunk];

const composeEnhancers = (process.env.MODE_ENV !== 'production' && typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch