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
    }
}

export default eventActions;