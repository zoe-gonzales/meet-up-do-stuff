import React from 'react';
import Event from '../components/SmallEventCard';
import Heading from '../components/Heading';
import UseAllEvents from '../hooks/UseAllEvents';

const colors = ['#FFC5AB', '#ffd965', '#E8E151', '#ADA6FF'];

const HomePageAsUser = props => {
    const userID = props.match.params.id;
    const events = UseAllEvents();
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
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

export default HomePageAsUser;