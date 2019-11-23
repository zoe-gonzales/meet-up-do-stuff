const types = {
    updateAuthInputs(inputs) {
        return {
            type: 'UPDATE_AUTH_INPUTS',
            data: inputs,
        }
    },
    updateSearchInputs(inputs) {
        return {
            type: 'UPDATE_SEARCH_INPUTS',
            data: inputs,
        }
    },
    updateProfileInputs(inputs) {
        return {
            type: 'UPDATE_PROFILE_INPUTS',
            data: inputs,
        }
    },
    populateEvents(events) {
        return {
            type: 'POPULATE_EVENTS',
            data: events,
        }
    },
    getOneEvent(event) {
        return {
            type: 'GET_ONE_EVENT',
            data: event,
        }
    }
}

export default types;