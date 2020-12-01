import createReducer from '../utils/createReducer';
import * as types from './profileTypes';
import * as authTypes from '../auth/authTypes';

const initialState = {
  profile: {},
  isLoading: false,
  errors: null,
  isSuccess: false,
};

const profileStart = (state) => ({
  ...state,
  isLoading: true,
  profile: {},
  errors: null,
  isSuccess: false,
});
const profileSuccess = (state, payload) => {
  if (payload) {
    return {
      ...state,
      isLoading: false,
      profile: {
        ...payload,
        startDate:
          payload && payload.startDate && payload.startDate.slice(0, 10),
      },
      errors: null,
      isSuccess: false,
    };
  }
  return {
    ...state,
    isLoading: false,
    profile: {},
    errors: null,
    isSuccess: false,
  };
};

const addOrUpdateProfile = (state, payload) => ({
  ...state,
  isLoading: false,
  profile: {
    ...payload,
    startDate: payload && payload.startDate && payload.startDate.slice(0, 10),
  },
  errors: null,
  isSuccess: true,
});

const profileFailure = (state, payload) => ({
  ...state,
  isLoading: false,
  profile: {},
  errors: payload,
  isSuccess: false,
});
const profileDeleteSuccess = () => initialState;
const resetSuccess = (state) => ({ ...state, isSuccess: false });

export default createReducer(initialState, {
  [types.GET_PROFILE_START]: profileStart,
  [types.GET_PROFILE_SUCCESS]: profileSuccess,
  [types.GET_PROFILE_FAILURE]: profileFailure,
  [types.ADD_PROFILE_START]: profileStart,
  [types.ADD_PROFILE_SUCCESS]: addOrUpdateProfile,
  [types.ADD_PROFILE_FAILURE]: profileFailure,
  [types.UPDATE_PROFILE_START]: profileStart,
  [types.UPDATE_PROFILE_SUCCESS]: addOrUpdateProfile,
  [types.UPDATE_PROFILE_FAILURE]: profileFailure,
  [types.DELETE_PROFILE_START]: profileStart,
  [types.DELETE_PROFILE_SUCCESS]: profileDeleteSuccess,
  [types.DELETE_PROFILE_FAILURE]: profileFailure,
  [authTypes.LOGOUT]: profileDeleteSuccess,
  [types.RESET_PROFILE_SUCCESS]: resetSuccess,
});
