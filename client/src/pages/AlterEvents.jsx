import React from 'react';
import UsersEventsList from '../components/UsersEventsList';
import Heading from '../components/Heading';
import UseEventsAsOwner from '../hooks/UseEventsAsOwner';

const AlterEvents = props => {
    const userID = props.match.params.userID;
    const events = UseEventsAsOwner(userID);
    console.log(events)
    const myEvents = [
        {title:'pizza making class', id:1},
        {title:'yoga class', id:2},
        {title:'coding workshop', id:3},
        {title:'meet & greet', id:4},
        {title:'soccer playoffs', id:5},
    ]
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <div className="container flex-container">
                <UsersEventsList events={myEvents} userID={userID} />
            </div>
        </div>
    )
}

export default AlterEvents;