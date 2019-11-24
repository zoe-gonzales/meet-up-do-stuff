import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/formActions';

const UseRedirect = () => {
    const redirect = useSelector(state => state.Auth.redirect);
    const dispatch = useDispatch();

    const redirectPage = () => dispatch(actions.redirectPage());

    return {
        redirect,
        redirectPage,
    };
}

export default UseRedirect;