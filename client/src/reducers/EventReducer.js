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
            return Object.assign({}, state, {
                events: action.data
            });
        case 'GET_ONE_EVENT':
            return Object.assign({}, state, {
                currentEvent: action.data
            });
        case 'UPDATE_EVENT_INPUTS':
            const {
                title,
                desc,
                date,
                time,
                location,
                relatedInterests,
            } = action.data;
            return Object.assign({}, state, {
                inputs: {
                    title,
                    desc,
                    date,
                    time,
                    location,
                    relatedInterests,
                }
            });
        case 'UPDATE_RELATED_INTERESTS':
            return Object.assign({}, state, {
                relatedInterests: action.data
            });
        case 'REMOVE_EVENT':
            const eventsList = [...state.events];
            return Object.assign({}, state, {
                events: eventsList.filter(event => event.EventID !== action.data)
            });
        case 'CLEAR_FIELDS':
            return Object.assign({}, state, {
                inputs: {
                    title: '',
                    desc: '',
                    date: '',
                    time: '',
                    location: '',
                    relatedInterests: [],
                }
            });
        default:
            return state;
    }
}

export default Event;