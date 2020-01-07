import React from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';

const UsersEventsList = ({ events, userID }) => {
    const deleteEvent = e => {
        const { id } = e.target.dataset
        const answer = window.confirm("Are you sure you want to delete this event? This action cannot be undone.")
        if (answer) {
            /* 
            API
              .deleteEvent(id)
              .then(res => console.log(res))
              .catch(err => console.log(err))
            */
        }
    }

    return (
        <ul className="list-group">
            {
                events.map(event => {
                    return (
                        <li className="list-group-item" key={event.id}>
                            <Link style={{ color: 'black' }} to={`/user/${userID}/events/${event.id}`}>{event.title}</Link>
                            <span style={{ float: 'right' }}>
                                <Link to={`/user/${userID}/updateevent/${event.id}`} className="square-btn btn btn-outline-dark border border-secondary">Update</Link>
                                <span style={{ margin: 5 }}></span>
                                <button onClick={e => deleteEvent(e)} data-id={event.id} className="square-btn btn btn-outline-dark border border-secondary">Delete</button>
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UsersEventsList;