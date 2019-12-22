import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Search from './SearchReducer';
import Profile from './ProfileReducer';
import Event from './EventReducer';
import Redirect from './RedirectReducer';
import Validation from './ValidationReducer';

const RootReducer = combineReducers({
    Auth,
    Search,
    Profile,
    Event,
    Redirect,
    Validation,
});

export default RootReducer;