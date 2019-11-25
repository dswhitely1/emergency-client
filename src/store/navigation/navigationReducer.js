import createReducer from "../utils/createReducer";
import * as types from './navigationTypes';

const initialState = {
    isOpen: false,
    drawerWidth: 240
};

const toggleDrawer = state => ({...state, isOpen: !state.isOpen});

export default createReducer(initialState, {
    [types.TOGGLE_DRAWER]: toggleDrawer
})
