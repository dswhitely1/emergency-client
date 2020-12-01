import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as types from './weatherTypes';
import { FETCH_WEATHER_CONDITIONS_FAILURE } from './weatherTypes';

export const useWeatherActions = () => {
  const dispatch = useDispatch();

  async function weatherInformation() {
    try {
      const alerts = await axios.get(
        'https://api.weather.gov/alerts/active/zone/INZ090'
      );
      return { alerts };
    } catch (err) {
      return {};
    }
  }

  const fetchWeatherAlerts = useCallback(() => {
    dispatch({ type: types.FETCH_WEATHER_ALERTS_START });
    axios
      .get('https://api.weather.gov/alerts/active/zone/INZ090')
      .then((res) => {
        dispatch({
          type: types.FETCH_WEATHER_ALERTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.FETCH_WEATHER_ALERTS_FAILURE,
          payload: err.response,
        });
      });
  }, [dispatch]);

  const fetchWeatherConditions = useCallback(() => {
    dispatch({ type: types.FETCH_WEATHER_CONDITIONS_START });
    axios
      .get('https://api.weather.gov/stations/KSDF/observations')
      .then((res) => {
        dispatch({
          type: types.FETCH_WEATHER_CONDITIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.FETCH_WEATHER_CONDITIONS_FAILURE,
          payload: err.response,
        });
      });
  }, [dispatch]);

  return { fetchWeatherAlerts, fetchWeatherConditions };
};
