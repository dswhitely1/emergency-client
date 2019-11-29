import createReducer from "../utils/createReducer";
import * as types from './referenceTypes';
import {LOGOUT} from "../auth/authTypes";

const initialState = {
    reference: [],
    isLoading: false,
    errors: null,
    isSuccess: false
}

const referenceStart = state => ({...state, isLoading: true, reference: [], errors: null})
const referenceSuccess = (state, payload) => ({...state, isLoading: false, reference: payload, errors: null});
const addOrUpdateReferenceSuccess = (state, payload) => ({...state, isLoading: false, reference: payload, errors: null, isSuccess: true})
const referenceFail = (state, payload) => ({...state, isLoading: false, errors: payload, isSuccess: false});
const logout = () => initialState;
const resetSuccess = state => ({...state, isSuccess: false})

export default createReducer(initialState, {
    [types.FETCH_REFERENCES_DATA_START]: referenceStart,
    [types.FETCH_REFERENCES_DATA_SUCCESS]: referenceSuccess,
    [types.FETCH_REFERENCES_DATA_FAILURE]: referenceFail,
    [types.ADD_REFERENCES_DATA_START]: referenceStart,
    [types.ADD_REFERENCES_DATA_SUCCESS]: addOrUpdateReferenceSuccess,
    [types.ADD_REFERENCES_DATA_FAILURE]: referenceFail,
    [types.UPDATE_REFERENCES_DATA_START]: referenceStart,
    [types.UPDATE_REFERENCES_DATA_SUCCESS]: addOrUpdateReferenceSuccess,
    [types.UPDATE_REFERENCES_DATA_FAILURE]: referenceFail,
    [types.DELETE_REFERENCES_DATA_START]: referenceStart,
    [types.DELETE_REFERENCES_DATA_SUCCESS]: referenceSuccess,
    [types.DELETE_REFERENCES_DATA_FAILURE]: referenceFail,
    [LOGOUT]: logout,
    [types.RESET_REFERENCES_SUCCESS]: resetSuccess
})
