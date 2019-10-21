import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/formActions';

const UseForm = cb => {
    const inputs = useSelector(state => state.Auth.inputs);
    const dispatch = useDispatch();

    const handleInputChange = e => {
        e.persist();
        const { name, value } = e.target;
        const changedInputs = {...inputs, [name]: value};
        dispatch(actions.updateFormData(changedInputs));
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
