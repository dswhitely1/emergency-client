import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const middleware = [logger];
const enhancers = applyMiddleware(...middleware);

const store =
  process.env.NODE_ENV === 'development'
    ? createStore(rootReducer, composeWithDevTools(enhancers))
    : createStore(rootReducer);

export default store;
