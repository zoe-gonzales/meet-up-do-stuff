import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/formActions';

const UseValidator = () => {
    const validInputs = useSelector(state => state.Validation.validInputs);
    const dispatch = useDispatch();
    const invalidateInputs = () => dispatch(actions.invalidateInputs());

    return {
        validInputs,
        invalidateInputs,
    }
}

export default UseValidator;