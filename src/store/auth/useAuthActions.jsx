import {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {axiosNoAuth as axios} from "../utils/axiosConfig";
import * as types from './authTypes';

export const useAuthActions = () => {
    const dispatch = useDispatch();

    const login = useCallback(credentials => {
        dispatch({type: types.LOGIN_START});
        axios().post('/auth/login', credentials).then(res => {
            console.log(res.data);
            dispatch({type: types.LOGIN_SUCCESS, payload: res.data.token})
        }).catch(err => {
            console.log(err.response);
            dispatch({type: types.LOGIN_FAILURE, payload: err.response});
        })
    }, [dispatch]);

    const register = useCallback(credentials => {
        dispatch({type: types.REGISTER_START});
        axios().post('/auth/register', credentials).then(res => {
            console.log(res.data);
            dispatch({type: types.REGISTER_SUCCESS, payload: res.data.token})
        }).catch(err => {
            console.log(err.response);
            dispatch({type: types.REGISTER_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    return {login, register};
};
