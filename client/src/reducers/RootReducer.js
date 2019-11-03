import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Search from './SearchReducer';
import Profile from './ProfileReducer';

const RootReducer = combineReducers({
    Auth,
    Search,
    Profile,
});

export default RootReducer;