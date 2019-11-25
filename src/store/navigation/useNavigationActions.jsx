import {useCallback} from 'react';
import {useDispatch} from "react-redux";
import * as types from './navigationTypes';

export const useNavigationActions = () => {
    const dispatch = useDispatch();

    const toggleDrawer = useCallback(() => {
        dispatch({type: types.TOGGLE_DRAWER});
    }, [dispatch]);

    return {toggleDrawer}
};
