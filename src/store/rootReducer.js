import {combineReducers} from "redux";
import auth from './auth/authReducer';
import nav from './navigation/navigationReducer'
import profile from './profile/profileReducer'
import employment from './employment/employmentReducer'

export default combineReducers({auth, nav, profile, employment});
