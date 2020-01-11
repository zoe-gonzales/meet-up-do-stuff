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
    }
}

export default eventActions;