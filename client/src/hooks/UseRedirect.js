import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/formActions';

const UseRedirect = () => {
    const redirect = useSelector(state => state.Auth.redirect);
    const id = useSelector(state => state.Auth.redirectId);
    const dispatch = useDispatch();

    const redirectPage = () => dispatch(actions.redirectPage());

    const setRedirectId = id => dispatch(actions.setUserId(id));

    return {
        redirect,
        redirectPage,
        id,
        setRedirectId,
    };
}

export default UseRedirect;