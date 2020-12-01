import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { axiosWithAuth as axios } from '../utils/axiosConfig';
import * as types from './educationTypes';

export const useEducationActions = () => {
  const dispatch = useDispatch();

  const fetchEducationData = useCallback(
    (token) => {
      dispatch({ type: types.FETCH_EDUCATION_DATA_START });
      axios(token)
        .get('/education')
        .then((res) => {
          dispatch({
            type: types.FETCH_EDUCATION_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_EDUCATION_DATA_FAILURE,
            payload: err.response,
          });
        });
    },
    [dispatch]
  );

  const addEducationData = useCallback(
    (token, newEducationData) => {
      dispatch({ type: types.ADD_EDUCATION_DATA_START });
      axios(token)
        .post('/education', newEducationData)
        .then((res) => {
          dispatch({
            type: types.ADD_EDUCATION_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: types.ADD_EDUCATION_DATA_FAILURE,
            payload: err.response,
          });
        });
    },
    [dispatch]
  );

  const updateEducationData = useCallback(
    (token, updatedEducationData) => {
      dispatch({ type: types.UPDATE_EDUCATION_DATA_START });
      axios(token)
        .put(`/education/${updatedEducationData.id}`, updatedEducationData)
        .then((res) => {
          dispatch({
            type: types.UPDATE_EDUCATION_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: types.UPDATE_EDUCATION_DATA_FAILURE,
            payload: err.response,
          });
        });
    },
    [dispatch]
  );

  const deleteEducationData = useCallback(
    (token, id) => {
      dispatch({ type: types.DELETE_EDUCATION_DATA_START });
      axios(token)
        .delete(`/education/${id}`)
        .then((res) => {
          dispatch({
            type: types.DELETE_EDUCATION_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: types.DELETE_EDUCATION_DATA_FAILURE,
            payload: err.response,
          });
        });
    },
    [dispatch]
  );

  const resetEducationSuccess = useCallback(() => {
    dispatch({ type: types.RESET_EDUCATION_SUCCESS });
  }, [dispatch]);

  return {
    fetchEducationData,
    addEducationData,
    updateEducationData,
    deleteEducationData,
    resetEducationSuccess,
  };
};
