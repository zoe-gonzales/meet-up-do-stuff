import types from './types';

const formActions = {
    updateAuthData(data) {
        return (dispatch) => {
            dispatch(types.updateAuthInputs(data));
        }
    },
    updateSearchData(data) {
        return (dispatch) => {
            dispatch(types.updateSearchInputs(data));
        }
    }
}

export default formActions;