import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/formActions';

const UseForm = (cb, formType) => {
    const inputs = useSelector(state => {
        switch(formType) {
            case 'auth':
                return state.Auth.inputs;
            case 'search':
                return state.Search.inputs;
            default:
                return state;
        }
    });
    const dispatch = useDispatch();

    const handleInputChange = e => {
        e.persist();
        const { name, value } = e.target;
        const changedInputs = {...inputs, [name]: value};
        let dispatchAction;
        switch(formType) {
            case 'auth':
                dispatchAction = actions.updateAuthData(changedInputs);
                break;
            case 'search':
                dispatchAction = actions.updateSearchData(changedInputs);
                break;
        }
        dispatch(dispatchAction);
    }

    const handleSubmit = e => {
        e.preventDefault();
        cb();
    }

    return {
        inputs,
        handleInputChange,
        handleSubmit,
    }
};

export default UseForm;
