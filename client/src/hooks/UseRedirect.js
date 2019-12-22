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

    return {
        redirect,
        redirectPage,
        id,
    };
}

export default UseRedirect;