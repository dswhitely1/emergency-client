import createReducer from "../utils/createReducer";
import * as types from './navigationTypes';

const initialState = {
    isOpen: false,
};

const toggleDrawer = state => ({...state, isOpen: !state.isOpen});
const drawerOff = state => ({...state, isOpen: false})

export default createReducer(initialState, {
    [types.TOGGLE_DRAWER]: toggleDrawer,
    [types.DRAWER_OFF]: drawerOff
})
