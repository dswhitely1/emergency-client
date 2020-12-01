import createReducer from '../utils/createReducer';
import * as types from './messageTypes';

const initialState = {
  isLoading: false,
  isSuccess: false,
  errors: null,
};

const messageStart = (state) => ({
  ...state,
  isLoading: true,
  errors: null,
  isSuccess: false,
});
const messageSuccess = (state) => ({
  ...state,
  isLoading: false,
  errors: null,
  isSuccess: true,
});
const messageFail = (state, payload) => ({
  ...state,
  isLoading: false,
  errors: payload,
  isSuccess: false,
});
const resetMessageSuccess = (state) => ({
  ...state,
  isSuccess: false,
  errors: null,
});

export default createReducer(initialState, {
  [types.SEND_MESSAGE_START]: messageStart,
  [types.SEND_MESSAGE_SUCCESS]: messageSuccess,
  [types.SEND_MESSAGE_FAILURE]: messageFail,
  [types.RESET_MESSAGE_SUCCESS]: resetMessageSuccess,
});
