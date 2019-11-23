import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Search from './SearchReducer';
import Profile from './ProfileReducer';
import Event from './EventReducer';

const RootReducer = combineReducers({
    Auth,
    Search,
    Profile,
    Event,
});

export default RootReducer;