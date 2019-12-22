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
    updateEventData(data) {
        return (dispatch) => {
            dispatch(types.updateEventInputs(data));
        }
    },
    updateEventInterests(data) {
        return (dispatch) => {
            dispatch(types.updateEventInterests(data));
        }
    },
    redirectPage(data) {
        return (dispatch) => {
            dispatch(types.redirectPage(data));
        }
    },
}

export default formActions;