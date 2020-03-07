const initialState = {
    events: [],
    currentEvent: {},
    inputs: {
        title: '',
        desc: '',
        date: '',
        time: '',
        location: '',
        relatedInterests: [],
    }
}

const Event = (state = initialState, action) => {
    switch(action.type) {
        case 'POPULATE_EVENTS':
            return {
                ...state,
                events: action.data
            };
        case 'GET_ONE_EVENT':
            return {
                ...state,
                currentEvent: action.data
            };
        case 'UPDATE_EVENT_INPUTS':
            return {
                ...state,
                inputs: action.data
            };
        case 'UPDATE_RELATED_INTERESTS':
            return {
                ...state,
                relatedInterests: action.data
            };
        case 'REMOVE_EVENT':
            const eventsList = [...state.events];
            return {
                ...state,
                events: eventsList.filter(event => event.EventID !== action.data)
            };
        case 'CLEAR_FIELDS':
            return {
                ...state,
                inputs: {
                    title: '',
                    desc: '',
                    date: '',
                    time: '',
                    location: '',
                    relatedInterests: [],
                }
            };
        default:
            return state;
    }
}

export default Event;