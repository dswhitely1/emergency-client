import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { axiosWithAuth as axios } from '../utils/axiosConfig';
import * as types from './referenceTypes';

export const useReferenceActions = () => {
  const dispatch = useDispatch();

  const fetchReferenceData = useCallback(
    (token) => {
      dispatch({ type: types.FETCH_REFERENCES_DATA_START });
      axios(token)
        .get('/references')
        .then((res) => {
          dispatch({
            type: types.FETCH_REFERENCES_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_REFERENCES_DATA_FAILURE,
            payload: err.response,
          });
        });
    },
    [dispatch],
  );

  const addReferenceData = useCallback(
    (token, newReferenceData) => {
      dispatch({ type: types.ADD_REFERENCES_DATA_START });
      axios(token)
        .post('/references', newReferenceData)
        .then((res) => {
          dispatch({
            type: types.ADD_REFERENCES_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: types.ADD_REFERENCES_DATA_FAILURE,
            payload: err.response,
          });
        });
    },
    [dispatch],
  );

  const updateReferenceData = useCallback(
    (token, updatedReferenceData) => {
      dispatch({ type: types.UPDATE_REFERENCES_DATA_START });
      axios(token)
        .put(`/references/${updatedReferenceData.id}`, updatedReferenceData)
        .then((res) => {
          dispatch({
            type: types.UPDATE_REFERENCES_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: types.UPDATE_REFERENCES_DATA_FAILURE,
            payload: err.response,
          });
        });
    },
    [dispatch],
  );

  const deleteReferenceData = useCallback(
    (token, id) => {
      dispatch({ type: types.DELETE_REFERENCES_DATA_START });
      axios(token)
        .delete(`/references/${id}`)
        .then((res) => {
          dispatch({
            type: types.DELETE_REFERENCES_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: types.DELETE_REFERENCES_DATA_FAILURE,
            payload: err.response,
          });
        });
    },
    [dispatch],
  );

  const resetReferenceSuccess = useCallback(() => {
    dispatch({ type: types.RESET_REFERENCES_SUCCESS });
  }, [dispatch]);

  return {
    fetchReferenceData,
    addReferenceData,
    updateReferenceData,
    deleteReferenceData,
    resetReferenceSuccess,
  };
};
