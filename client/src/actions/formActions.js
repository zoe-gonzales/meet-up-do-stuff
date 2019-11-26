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
    redirectPage() {
        return (dispatch) => {
            dispatch(types.redirectPage());
        }
    },
    setUserId(id) {
        return (dispatch) => {
            dispatch(types.setId(id));
        } 
    }
}

export default formActions;