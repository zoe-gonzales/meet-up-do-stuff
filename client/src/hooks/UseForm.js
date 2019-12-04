import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/formActions';

const UseForm = (cb, formType) => {
    const inputs = useSelector(state => {
        switch(formType) {
            case 'auth':
                return state.Auth.inputs;
            case 'search':
                return state.Search.inputs;
            case 'profile':
                return state.Profile.inputs;
            case 'add event':
                return state.Event.inputs;
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
            case 'profile':
                dispatchAction = actions.updateProfileData(changedInputs);
                break;
            case 'add event':
                dispatchAction = actions.updateEventData(changedInputs);
                break;
            default:
                dispatchAction = null;
        }
        if (dispatchAction) {
            dispatch(dispatchAction);
        } else {
            // handle error here
        }
    }

    const handleCheckboxSelection = e => {
        e.persist();
        const { value } = e.target;
        const interests = inputs.relatedInterests;
        interests.push(value)
        dispatch(actions.updateEventInterests(interests));
    }

    const handleSubmit = e => {
        e.preventDefault();
        cb();
    }

    return {
        inputs,
        handleInputChange,
        handleCheckboxSelection,
        handleSubmit,
    }
};

export default UseForm;