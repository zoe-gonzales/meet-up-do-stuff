const initialState = {
    events: [],
    currentEvent: {},
}

const Event = (state = initialState, action) => {
    switch(action.type) {
        case 'POPULATE_EVENTS':
            return Object.assign({}, state, {
                events: action.data
            });
        case 'GET_ONE_EVENT':
            return Object.assign({}, state, {
                currentEvent: action.data
            });
        default:
            return state;
    }
}

export default Event;