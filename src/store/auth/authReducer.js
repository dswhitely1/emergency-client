import * as types from './authTypes';
import createReducer from "../utils/createReducer";

const initialState = {
    isLoading: false,
    token: null,
    errors: null
};

const authStart = state => ({...state, isLoading: true, token: null, errors: null});
const authSuccess = (state, payload) => ({...state, isLoading: false, token: payload, errors: null});
const authFailure = (state, payload) => ({...state, isLoading: false, token: null, errors: payload});
const logout = () => initialState;

export default createReducer(initialState, {
    [types.LOGIN_START]: authStart,
    [types.LOGIN_SUCCESS]: authSuccess,
    [types.LOGIN_FAILURE]: authFailure,
    [types.REGISTER_START]: authStart,
    [types.REGISTER_SUCCESS]: authSuccess,
    [types.REGISTER_FAILURE]: authFailure,
    [types.LOGOUT]: logout,
    [types.WELCOME_BACK]: authSuccess
})
