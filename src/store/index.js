import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import logger from 'redux-logger';
import rootReducer from "./rootReducer";

const middleware = [logger];
const enhancers = applyMiddleware(...middleware);

export default createStore(rootReducer, composeWithDevTools(enhancers));
