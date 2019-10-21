import types from './types';

const formActions = {
    updateFormData(data) {
        return (dispatch) => {
            dispatch(types.updateInputs(data));
        }
    }
}

export default formActions;