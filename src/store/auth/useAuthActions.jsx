import {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {axiosNoAuth as axios} from "../utils/axiosConfig";
import * as types from './authTypes';

export const useAuthActions = () => {
    const dispatch = useDispatch();

    const login = useCallback(credentials => {
        dispatch({type: types.LOGIN_START});
        axios().post('/auth/login', credentials).then(res => {
            localStorage.setItem('ee_token', JSON.stringify(res.data.token));
            dispatch({type: types.LOGIN_SUCCESS, payload: res.data.token})
        }).catch(err => {
            localStorage.removeItem('ee_token');
            dispatch({type: types.LOGIN_FAILURE, payload: err.response});
        })
    }, [dispatch]);

    const register = useCallback(credentials => {
        dispatch({type: types.REGISTER_START});
        axios().post('/auth/register', credentials).then(res => {
            localStorage.setItem('ee_token', JSON.stringify(res.data.token));
            dispatch({type: types.REGISTER_SUCCESS, payload: res.data.token})
        }).catch(err => {
            localStorage.removeItem('ee_token');
            dispatch({type: types.REGISTER_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    const logout = useCallback(()=> {
        localStorage.removeItem('ee_token')
        dispatch({type: types.LOGOUT})
    }, [dispatch]);

    const welcomeBack = useCallback(token => {
        dispatch({type: types.WELCOME_BACK, payload: token})
    }, [dispatch]);

    return {login, register, logout, welcomeBack};
};
