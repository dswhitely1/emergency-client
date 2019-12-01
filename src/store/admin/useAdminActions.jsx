import {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {axiosWithAuth as axios} from "../utils/axiosConfig";
import * as types from './adminTypes';

export const useAdminActions = () => {
    const dispatch = useDispatch();

    const fetchUsers = useCallback(token => {
        dispatch({type: types.FETCH_USERS_START});
        axios(token).get('/admin/users').then(res => {
            dispatch({type: types.FETCH_USERS_SUCCESS, payload: res.data})
        }).catch(err => {
            dispatch({type: types.FETCH_USERS_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    const fetchUserProfile = useCallback((token, id) => {
        dispatch({type: types.FETCH_USER_PROFILE_START});
        axios(token).get(`/admin/users/profile/${id}`).then(res => {
            dispatch({type: types.FETCH_USER_PROFILE_SUCCESS, payload: res.data})
        }).catch(err => {
            dispatch({type: types.FETCH_USER_PROFILE_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    const fetchProfiles = useCallback(token => {
        dispatch({type: types.FETCH_PROFILES_START});
        axios(token).get('/admin/profiles').then(res => {
            dispatch({type: types.FETCH_PROFILES_SUCCESS, payload: res.data})
        }).catch(err => {
            dispatch({type: types.FETCH_PROFILES_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    return {fetchUsers, fetchUserProfile, fetchProfiles}
};
