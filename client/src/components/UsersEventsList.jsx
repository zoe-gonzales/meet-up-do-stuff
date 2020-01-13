import React from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';

const UsersEventsList = ({ removeEvent, events, userID }) => {
    const deleteEvent = e => {
        const { id } = e.target.dataset
        const answer = window.confirm("Are you sure you want to delete this event? This action cannot be undone.")
        if (answer) {
          API
            .deleteEvent(id)
            .then(res => {
                if (res.status === 200) {
                    alert("Your event has been deleted.")
                    removeEvent(parseInt(id))
                }
            })
            .catch(err => {
                console.log(err)
                alert("Event was not deleted. Please try again later.")
            })
        }
    }

    return (
        <ul className="list-group">
            {
                events.map(event => {
                    return (
                        <li className="list-group-item" key={event.EventID}>
                            <Link style={{ color: 'black' }} to={`/user/${userID}/events/${event.EventID}`}>{event.Title}</Link>
                            <span style={{ float: 'right' }}>
                                <Link to={`/user/${userID}/updateevent/${event.EventID}`} className="square-btn btn btn-outline-dark border border-secondary">Update</Link>
                                <span style={{ margin: 5 }}></span>
                                <button onClick={e => deleteEvent(e)} data-id={event.EventID} className="square-btn btn btn-outline-dark border border-secondary">Delete</button>
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UsersEventsList;