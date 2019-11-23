import types from './types';

const eventActions = {
    populateEvents(data) {
        return (dispatch) => {
            dispatch(types.populateEvents(data));
        }
    },
}

export default eventActions;