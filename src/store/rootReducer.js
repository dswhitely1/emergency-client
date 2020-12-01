import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import nav from './navigation/navigationReducer';
import profile from './profile/profileReducer';
import employment from './employment/employmentReducer';
import education from './education/educationReducer';
import reference from './references/referenceReducer';
import admin from './admin/adminReducer';
import weather from './weather/weatherReducer';
import message from './messages/messageReducer';

export default combineReducers({
  auth,
  nav,
  profile,
  employment,
  education,
  reference,
  admin,
  weather,
  message,
});
