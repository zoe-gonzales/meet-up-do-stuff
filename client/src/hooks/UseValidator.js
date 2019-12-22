import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/formActions';

const UseValidator = () => {
    const validInputs = useSelector(state => state.Validation.validInputs);
    const duplicateEmail = useSelector(state => state.Validation.duplicateEmail);
    const dispatch = useDispatch();
    const invalidateInputs = () => dispatch(actions.invalidateInputs());
    const duplicateEmailFound = () => dispatch(actions.duplicateEmail());

    return {
        validInputs,
        invalidateInputs,
        duplicateEmail,
        duplicateEmailFound,
    }
}

export default UseValidator;