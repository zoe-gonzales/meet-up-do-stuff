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
    updateEventInputs(inputs) {
        return {
            type: 'UPDATE_EVENT_INPUTS',
            data: inputs,
        }
    },
    updateEventInterests(data) {
        return {
            type: 'UPDATE_RELATED_INTERESTS',
            data: data,
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
    redirectPage(redirectData) {
        return {
            type: 'REDIRECT_PAGE',
            data: redirectData,
        }
    },
    resetRedirect() {
        return {
            type: 'RESET_REDIRECT_STATE'
        }
    },
    setId(id) {
        return {
            type: 'SET_ID',
            data: id,
        }
    },
    getOneProfile(profile) {
        return {
            type: 'GET_ONE_PROFILE',
            data: profile,
        }
    }
}

export default types;