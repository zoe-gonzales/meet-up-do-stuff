import axios from 'axios';

export default {
    getAllEvents() {
        return axios.get("/events");
    },
    getSingleEvent() {},
    updateEvent() {},
    deleteEvent() {},
    logInUser() {},
    signUpUser() {},
    logOutUser() {},
}