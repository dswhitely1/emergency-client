import createReducer from '../utils/createReducer';
import * as types from './adminTypes';
import { LOGOUT } from '../auth/authTypes';

const initialState = {
  users: [],
  profiles: [],
  messages: [],
  selectedProfile: {
    profile: {},
    employment: [],
    education: [],
    references: [],
  },
  isLoading: false,
  errors: null,
};

const adminStart = (state) => ({ ...state, isLoading: true, errors: null });
const fetchUsersSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  errors: null,
  users: payload,
});
const fetchProfilesSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  errors: null,
  profiles: payload,
});
const fetchUserProfileSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  errors: null,
  selectedProfile: { ...payload },
});
const fetchMessagesSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  messages: payload,
  errors: null,
});
const adminFail = (state, payload) => ({
  ...state,
  isLoading: false,
  errors: payload,
});
const logout = () => initialState;

export default createReducer(initialState, {
  [types.FETCH_USERS_START]: adminStart,
  [types.FETCH_USERS_SUCCESS]: fetchUsersSuccess,
  [types.FETCH_USERS_FAILURE]: adminFail,
  [types.FETCH_USER_PROFILE_START]: adminStart,
  [types.FETCH_USER_PROFILE_SUCCESS]: fetchUserProfileSuccess,
  [types.FETCH_USERS_FAILURE]: adminFail,
  [LOGOUT]: logout,
  [types.FETCH_PROFILES_START]: adminStart,
  [types.FETCH_PROFILES_SUCCESS]: fetchProfilesSuccess,
  [types.FETCH_PROFILES_FAILURE]: adminFail,
  [types.FETCH_MESSAGES_START]: adminStart,
  [types.FETCH_MESSAGES_SUCCESS]: fetchMessagesSuccess,
  [types.FETCH_MESSAGES_FAILURE]: adminFail,
  [types.MARK_MESSAGE_READ_START]: adminStart,
  [types.MARK_MESSAGE_READ_SUCCESS]: fetchMessagesSuccess,
  [types.MARK_MESSAGE_READ_FAILURE]: adminFail,
  [types.DELETE_MESSAGE_START]: adminStart,
  [types.DELETE_MESSAGE_SUCCESS]: fetchMessagesSuccess,
  [types.DELETE_MESSAGE_FAILURE]: adminFail,
});
