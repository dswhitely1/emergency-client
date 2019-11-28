import {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {axiosWithAuth as axios} from "../utils/axiosConfig";
import * as types from './profileTypes';

export const useProfileActions = () => {
    const dispatch = useDispatch();

    const getProfile = useCallback(token => {
        dispatch({type: types.GET_PROFILE_START});
        axios(token).get('/profiles').then(res => dispatch({
            type: types.GET_PROFILE_SUCCESS,
            payload: res.data
        })).catch(err => dispatch({type: types.GET_PROFILE_FAILURE, payload: err.response}))
    }, [dispatch]);

    const addProfile = useCallback((token, newProfile) => {
        dispatch({type: types.ADD_PROFILE_START});
        axios(token).post('/profiles', newProfile).then(res => dispatch({
            type: types.ADD_PROFILE_SUCCESS,
            payload: res.data
        })).catch(err => dispatch({type: types.ADD_PROFILE_FAILURE, payload: err.response}))
    }, [dispatch]);

    const updateProfile = useCallback((token, updatedProfile) => {
        dispatch({type: types.UPDATE_PROFILE_START});
        axios(token).put(`/profiles/${updatedProfile.id}`, updatedProfile).then(res => dispatch({
            type: types.UPDATE_PROFILE_SUCCESS,
            payload: res.data
        })).catch(err => dispatch({type: types.UPDATE_PROFILE_FAILURE, payload: err.response}))
    }, [dispatch]);

    const deleteProfile = useCallback((token, id) => {
        dispatch({type: types.DELETE_PROFILE_START});
        axios(token).delete(`/profiles/${id}`).then(() => dispatch({type: types.DELETE_PROFILE_SUCCESS})).catch(err => dispatch({
            type: types.DELETE_PROFILE_FAILURE,
            payload: err.response
        }));
    }, [dispatch]);

    const resetProfileSuccess = useCallback(()=> {
        dispatch({type: types.RESET_PROFILE_SUCCESS});
    }, [dispatch]);

    return {getProfile, addProfile, updateProfile, deleteProfile, resetProfileSuccess}
};
