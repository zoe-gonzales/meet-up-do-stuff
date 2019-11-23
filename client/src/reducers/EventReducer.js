const initialState = {
    events: []
}

const Event = (state = initialState, action) => {
    switch(action.type) {
        case 'POPULATE_EVENTS':
            return Object.assign({}, state, {
                events: action.data
            });
        default:
            return state;
    }
}

export default Event;