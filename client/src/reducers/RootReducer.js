import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Search from './SearchReducer';

const RootReducer = combineReducers({
    Auth,
    Search,
});

export default RootReducer;