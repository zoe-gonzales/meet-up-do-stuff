import axios from 'axios';

export default {
    getAllEvents() {
        return axios.get("/events");
    },
    getOneEvent(id) {
        return axios.get(`/events/${id}`);
    },
    addEvent(data) {
        return axios.post("/event", data);
    },
    updateEvent(id) {
        return axios.put(`/event/${id}`);
    },
    deleteEvent(id) {
        return axios.delete(`/event/${id}`);
    },
    logInUser(data) {
        return axios.post("/login", data);
    },
    signUpUser(data) {
        return axios.post("/signup", data);
    },
    logOutUser(data) {
        return axios.post("/logout", data);
    },
    updateUser(email) {
        return axios.put(`/user/${email}`);
    },
    getUserByID(id) {
        return axios.get(`/user/${id}`);
    },
    deleteUser(email) {
        return axios.delete(`/user/${email}`);
    },
    getOneProfile(id) {
        return axios.get(`/profile/${id}`);
    },
    updateProfile(email, data) {
        return axios.put(`/profile/${email}`, data);
    },
}