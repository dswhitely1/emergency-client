import createReducer from '../utils/createReducer';
import * as types from './employmentTypes';
import { LOGOUT } from '../auth/authTypes';

const initialState = {
  employment: [],
  isLoading: false,
  errors: null,
  isSuccess: false,
};

const employmentStart = (state) => ({
  ...state,
  isLoading: true,
  employment: [],
  errors: null,
});
const employmentSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  employment: payload,
  errors: null,
});
const addOrUpdateEmploymentSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  employment: payload,
  errors: null,
  isSuccess: true,
});
const employmentFail = (state, payload) => ({
  ...state,
  isLoading: false,
  errors: payload,
  isSuccess: false,
});
const logout = () => initialState;
const resetSuccess = (state) => ({ ...state, isSuccess: false });

export default createReducer(initialState, {
  [types.FETCH_EMPLOYMENT_DATA_START]: employmentStart,
  [types.FETCH_EMPLOYMENT_DATA_SUCCESS]: employmentSuccess,
  [types.FETCH_EMPLOYMENT_DATA_FAILURE]: employmentFail,
  [types.ADD_EMPLOYMENT_DATA_START]: employmentStart,
  [types.ADD_EMPLOYMENT_DATA_SUCCESS]: addOrUpdateEmploymentSuccess,
  [types.ADD_EMPLOYMENT_DATA_FAILURE]: employmentFail,
  [types.UPDATE_EMPLOYMENT_DATA_START]: employmentStart,
  [types.UPDATE_EMPLOYMENT_DATA_SUCCESS]: addOrUpdateEmploymentSuccess,
  [types.UPDATE_EMPLOYMENT_DATA_FAILURE]: employmentFail,
  [types.DELETE_EMPLOYMENT_DATA_START]: employmentStart,
  [types.DELETE_EMPLOYMENT_DATA_SUCCESS]: employmentSuccess,
  [types.DELETE_EMPLOYMENT_DATA_FAILURE]: employmentFail,
  [LOGOUT]: logout,
  [types.RESET_EMPLOYMENT_SUCCESS]: resetSuccess,
});
