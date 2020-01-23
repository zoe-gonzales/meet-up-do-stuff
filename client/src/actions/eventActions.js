import types from './types';

const eventActions = {
    populateEvents(data) {
        return (dispatch) => {
            dispatch(types.populateEvents(data));
        }
    },
    getOneEvent(data) {
        return (dispatch) => {
            dispatch(types.getOneEvent(data));
        }
    },
    removeEvent(data) {
        return (dispatch) => {
            dispatch(types.removeEvent(data));
        }
    },
    clearFormInputs() {
        return (dispatch) => {
            dispatch(types.clearFields());
        }
    },
}

export default eventActions;