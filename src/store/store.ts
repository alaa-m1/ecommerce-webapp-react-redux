import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './rootReducer';

//The dispatch action will trigger the middleware before the the action trigger the reducer
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch