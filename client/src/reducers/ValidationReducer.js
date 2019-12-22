const initialState = {
    validInputs: true,
    duplicateEmail: false,
}

const Validation = (state = initialState, action) => {
    switch(action.type) {
        case 'INVALIDATE_INPUTS':
            return {
                ...state,
                validInputs: action.data,
            }
        case 'DUPLICATE_EMAIL':
            return {
                ...state,
                duplicateEmail: action.data,
            }
        default:
            return state;
    }
}

export default Validation;