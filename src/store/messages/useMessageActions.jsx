import {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {axiosNoAuth as axios} from "../utils/axiosConfig";
import * as types from './messageTypes';

export const useMessageActions = () => {
    const dispatch = useDispatch();

    const sendMessage = useCallback(message => {
        dispatch({type: types.SEND_MESSAGE_START});
        axios().post('/messages', message).then(() => {
            dispatch({type: types.SEND_MESSAGE_SUCCESS})
        }).catch(err => {
            console.log(err.response);
            dispatch({type: types.SEND_MESSAGE_FAILURE, payload: err.response})
        })
    }, [dispatch]);

    const resetSuccess = useCallback(()=> {
        dispatch({type: types.RESET_MESSAGE_SUCCESS})
    }, [dispatch]);

    return {sendMessage, resetSuccess}
};
