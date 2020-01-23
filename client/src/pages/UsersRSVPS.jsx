import React from 'react';
import Event from '../components/SmallEventCard';
import Heading from '../components/Heading';
import UseAttendeesEvents from '../hooks/UseAttendeesEvents';

const colors = ['#FFC5AB', '#ffd965', '#E8E151', '#ADA6FF'];

const UsersRSVPS = props => {
    const userID = props.match.params.userID;
    const events = UseAttendeesEvents(userID);
    
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <h4 className="title text-center">upcoming rsvps</h4>
            <div className="container flex-container">
            { events ? 
                events.map(event => {
                    const details = {
                        title: event.Title,
                        description: event.Desc,
                        path: `/user/${userID}/events/${event.ID}`
                    }
                    return (
                        <Event 
                            key={event.ID}
                            event={details}
                            background={colors[Math.floor(Math.random() * colors.length)]}
                        />
                        )
                    })
                : null
                }
            </div>
        </div>
    )
}

export default UsersRSVPS;