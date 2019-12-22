const initialState = {
    validInputs: true
}

const Validation = (state = initialState, action) => {
    switch(action.type) {
        case 'INVALIDATE_INPUTS':
            return {
                ...state,
                validInputs: action.data,
            }
        default:
            return state;
    }
}

export default Validation;