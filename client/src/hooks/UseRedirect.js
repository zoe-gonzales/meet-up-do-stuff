import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/formActions';

const UseRedirect = () => {
    const redirect = useSelector(state => state.Redirect.redirect);
    const id = useSelector(state => state.Redirect.redirectId);
    const dispatch = useDispatch();

    const redirectPage = id => dispatch(actions.redirectPage({
        redirect: true,
        redirectId: id
    }));

    const setRedirectId = id => dispatch(actions.setUserId(id));
    // const clearRedirectData = () => dispatch(actions.resetRedirect());

    return {
        redirect,
        redirectPage,
        id,
        setRedirectId,
    };
}

export default UseRedirect;