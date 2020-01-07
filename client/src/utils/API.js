import axios from 'axios';

export default {
    getAllEvents() {
        return axios.get("/events");
    },
    getOneEvent(id) {
        return axios.get(`/events/${id}`);
    },
    logInUser(data) {
        return axios.post("/login", data);
    },
    signUpUser(data) {
        return axios.post("/signup", data);
    },
    logOutUser() {
        return axios.post("/logout");
    },
    getOneProfile(id) {
        return axios.get(`/profile/${id}`);
    },
    // protected routes
    getEventAsUser(userID, eventID) {
        return axios.get(`/user/${userID}/event/${eventID}`, { withCredentials: true });
    },
    getEventsAsOwner(id) {
        return axios.get(`/user/${id}/eventsbyowner`, { withCredentials: true });
    },
    getUsersEvents(id) {
        return axios.get(`/user/${id}/events`, { withCredentials: true });
    },
    getUserByID(id) {
        return axios.get(`/user/${id}`, { withCredentials: true });
    },
    updateUser(id, email) {
        return axios.put(`/user/${id}/${email}`, { withCredentials: true });
    },
    deleteUser(id, email) {
        return axios.delete(`/user/${id}/${email}`, { withCredentials: true });
    },
    updateProfile(id, data) {
        return axios.put(`/user/${id}/profile/${id}`, data, { withCredentials: true });
    },
    addEvent(data) {
        return axios.post(`/user/0/event`, data, { withCredentials: true });
    },
    updateEvent(id, data) {
        return axios.put(`/user/0/event/${id}`, data, { withCredentials: true });
    },
    deleteEvent(id) {
        return axios.delete(`/user/0/event/${id}`, { withCredentials: true });
    },
}