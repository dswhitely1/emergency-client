import createReducer from "../utils/createReducer";
import * as types from './profileTypes'

const initialState = {
    profile: {},
    isLoading: false,
    errors: null
};

const profileStart = state => ({...state, isLoading: true, profile: {}, errors: null});
const profileSuccess = (state, payload) => {
    if (Boolean(payload)) {
        return ({
            ...state,
            isLoading: false,
            profile: {...payload, startDate: payload && payload.startDate && payload.startDate.slice(0, 10)},
            errors: null
        })
    }
    return ({...state, isLoading: false, profile: payload, errors: null})
};
const profileFailure = (state, payload) => ({...state, isLoading: false, profile: {}, errors: payload});
const profileDeleteSuccess = () => initialState;

export default createReducer(initialState, {
    [types.GET_PROFILE_START]: profileStart,
    [types.GET_PROFILE_SUCCESS]: profileSuccess,
    [types.GET_PROFILE_FAILURE]: profileFailure,
    [types.ADD_PROFILE_START]: profileStart,
    [types.ADD_PROFILE_SUCCESS]: profileSuccess,
    [types.ADD_PROFILE_FAILURE]: profileFailure,
    [types.UPDATE_PROFILE_START]: profileStart,
    [types.UPDATE_PROFILE_SUCCESS]: profileSuccess,
    [types.UPDATE_PROFILE_FAILURE]: profileFailure,
    [types.DELETE_PROFILE_START]: profileStart,
    [types.DELETE_PROFILE_SUCCESS]: profileDeleteSuccess,
    [types.DELETE_PROFILE_FAILURE]: profileFailure,
})
