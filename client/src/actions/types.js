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
    removeEvent(id) {
        return {
            type: 'REMOVE_EVENT',
            data: id,
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
    invalidateInputs() {
        return {
            type: 'INVALIDATE_INPUTS',
            data: false,
        }
    },
    duplicateEmail() {
        return {
            type: 'DUPLICATE_EMAIL',
            data: true,
        }
    },
    getOneProfile(profile) {
        return {
            type: 'GET_ONE_PROFILE',
            data: profile,
        }
    },
    clearFields() {
        return {
            type: 'CLEAR_FIELDS',
        }
    },
}

export default types;