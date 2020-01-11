import React from 'react';
import UsersEventsList from '../components/UsersEventsList';
import Heading from '../components/Heading';
import UseEventsAsOwner from '../hooks/UseEventsAsOwner';

const AlterEvents = props => {
    const userID = props.match.params.userID;
    const { events, removeEvent } = UseEventsAsOwner(userID);
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <div className="container flex-container">
                <UsersEventsList removeEvent={removeEvent} events={events} userID={userID} />
            </div>
        </div>
    )
}

export default AlterEvents;