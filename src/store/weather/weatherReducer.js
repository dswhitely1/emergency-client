import createReducer from "../utils/createReducer";
import * as types from './weatherTypes';

const initialState = {
    isLoading: false,
    errors: null,
    weather: {
        forecast: [],
        alerts: []
    }
};

const weatherStart = state => ({...state, isLoading: false, weather: {forecast: [], alerts: []}, errors: null});
const weatherAlertSuccess = (state, payload) => ({
    ...state,
    isLoading: false,
    weather: {...state.weather, alerts: payload},
    errors: null
});
const weatherConditionSuccess = (state, payload) => ({
    ...state,
    isLoading: false,
    weather: {...state.weather, forecast: payload},
    errors: null
});

const weatherFail = (state, payload) => ({...state, isLoading: false, errors: payload});

export default createReducer(initialState, {
    [types.FETCH_WEATHER_CONDITIONS_START]: weatherStart,
    [types.FETCH_WEATHER_CONDITIONS_SUCCESS]: weatherConditionSuccess,
    [types.FETCH_WEATHER_CONDITIONS_FAILURE]: weatherFail,
    [types.FETCH_WEATHER_ALERTS_START]: weatherStart,
    [types.FETCH_WEATHER_ALERTS_SUCCESS]: weatherAlertSuccess,
    [types.FETCH_WEATHER_ALERTS_FAILURE]: weatherFail
})
