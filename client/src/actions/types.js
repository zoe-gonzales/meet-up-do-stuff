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
    },
    redirectPage() {
        return {
            type: 'REDIRECT_PAGE',
            data: true,
        }
    },
    setId(id) {
        return {
            type: 'SET_ID',
            data: id,
        }
    }
}

export default types;