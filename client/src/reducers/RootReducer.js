import { combineReducers } from 'redux';
import Auth from './AuthReducer';

const RootReducer = combineReducers({
    Auth,
});

export default RootReducer;