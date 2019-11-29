import {combineReducers} from "redux";
import auth from './auth/authReducer';
import nav from './navigation/navigationReducer'
import profile from './profile/profileReducer'
import employment from './employment/employmentReducer'
import education from './education/educationReducer'

export default combineReducers({auth, nav, profile, employment, education});
