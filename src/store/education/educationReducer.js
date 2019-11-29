import createReducer from "../utils/createReducer";
import * as types from './educationTypes';
import {LOGOUT} from "../auth/authTypes";

const initialState = {
    education: [],
    isLoading: false,
    errors: null,
    isSuccess: false
}

const educationStart = state => ({...state, isLoading: true, employment: [], errors: null})
const educationSuccess = (state, payload) => ({...state, isLoading: false, employment: payload, errors: null});
const addOrUpdateEducationSuccess = (state, payload) => ({...state, isLoading: false, employment: payload, errors: null, isSuccess: true})
const educationFail = (state, payload) => ({...state, isLoading: false, errors: payload, isSuccess: false});
const logout = () => initialState;
const resetSuccess = state => ({...state, isSuccess: false})

export default createReducer(initialState, {
    [types.FETCH_EDUCATION_DATA_START]: educationStart,
    [types.FETCH_EDUCATION_DATA_SUCCESS]: educationSuccess,
    [types.FETCH_EDUCATION_DATA_FAILURE]: educationFail,
    [types.ADD_EDUCATION_DATA_START]: educationStart,
    [types.ADD_EDUCATION_DATA_SUCCESS]: addOrUpdateEducationSuccess,
    [types.ADD_EDUCATION_DATA_FAILURE]: educationFail,
    [types.UPDATE_EDUCATION_DATA_START]: educationStart,
    [types.UPDATE_EDUCATION_DATA_SUCCESS]: addOrUpdateEducationSuccess,
    [types.UPDATE_EDUCATION_DATA_FAILURE]: educationFail,
    [types.DELETE_EDUCATION_DATA_START]: educationStart,
    [types.DELETE_EDUCATION_DATA_SUCCESS]: educationSuccess,
    [types.DELETE_EDUCATION_DATA_FAILURE]: educationFail,
    [LOGOUT]: logout,
    [types.RESET_EDUCATION_SUCCESS]: resetSuccess
})
