import {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {axiosWithAuth as axios} from "../utils/axiosConfig";
import * as types from './employmentTypes';

export const useEmploymentActions = () => {
    const dispatch = useDispatch();

    const fetchEmploymentData = useCallback(token => {
        dispatch({type: types.FETCH_EMPLOYMENT_DATA_START});
        axios(token).get('/employment').then(res => {
            dispatch({type: types.FETCH_EMPLOYMENT_DATA_SUCCESS, payload: res.data})
        }).catch(err => {
            dispatch({type: types.FETCH_EMPLOYMENT_DATA_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    const addEmploymentData = useCallback((token, newEmploymentData) => {
        dispatch({type: types.ADD_EMPLOYMENT_DATA_START});
        axios(token).post('/employment', newEmploymentData).then(res => {
            dispatch({type: types.ADD_EMPLOYMENT_DATA_SUCCESS, payload: res.data})
        }).catch(err => {
            dispatch({type: types.ADD_EMPLOYMENT_DATA_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    const updateEmploymentData = useCallback((token, updatedEmploymentData) => {
        dispatch({type: types.UPDATE_EMPLOYMENT_DATA_START});
        axios(token).put(`/employment/${updatedEmploymentData.id}`, updatedEmploymentData).then(res => {
            dispatch({type: types.UPDATE_EMPLOYMENT_DATA_SUCCESS, payload: res.data})
        }).catch(err => {
            dispatch({type: types.UPDATE_EMPLOYMENT_DATA_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    const deleteEmploymentData = useCallback((token, id) => {
        dispatch({type: types.DELETE_EMPLOYMENT_DATA_START});
        axios(token).delete(`/employment/${id}`).then(res => {
            dispatch({type: types.DELETE_EMPLOYMENT_DATA_SUCCESS, payload: res.data})
        }).catch(err => {
            dispatch({type: types.DELETE_EMPLOYMENT_DATA_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    const resetEmploymentSuccess = useCallback(() => {
        dispatch({type: types.RESET_EMPLOYMENT_SUCCESS})
    }, [dispatch]);

    return {fetchEmploymentData, addEmploymentData, updateEmploymentData, deleteEmploymentData, resetEmploymentSuccess}
};
