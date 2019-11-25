import {combineReducers} from "redux";
import auth from './auth/authReducer';
import nav from './navigation/navigationReducer'

export default combineReducers({auth, nav});
