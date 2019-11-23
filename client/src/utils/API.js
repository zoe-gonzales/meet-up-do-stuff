import axios from 'axios';

export default {
    getAllEvents() {
        return axios.get("/events");
    },
    getOneEvent(id) {
        return axios.get(`/events/${id}`);
    },
    updateEvent() {},
    deleteEvent() {},
    logInUser() {},
    signUpUser() {},
    logOutUser() {},
}