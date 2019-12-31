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
    updateEvent(id, data) {
        return axios.put(`/event/${id}`, data);
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
    getOneProfile(id) {
        return axios.get(`/profile/${id}`);
    },
    // protected routes
    getEventAsUser(userID, eventID) {
        return axios.get(`/user/${userID}/event/${eventID}`, { withCredentials: true });
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
}