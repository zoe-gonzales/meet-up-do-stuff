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
    },
    updateProfileData(data) {
        return (dispatch) => {
            dispatch(types.updateProfileInputs(data));
        }
    },
}

export default formActions;