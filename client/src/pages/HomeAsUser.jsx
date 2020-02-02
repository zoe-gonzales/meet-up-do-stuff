import React from 'react';
import { Link } from 'react-router-dom';
import Event from '../components/SmallEventCard';
import Heading from '../components/Heading';
import Button from '../components/Button';
import UseAllEvents from '../hooks/UseAllEvents';

const colors = ['#FFC5AB', '#ffd965', '#E8E151', '#ADA6FF'];

const HomePageAsUser = props => {
    const userID = props.match.params.id;
    const events = UseAllEvents();
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <h4 className="title text-center">upcoming events</h4>
            <Link to={`/user/${userID}/events`} className="d-flex justify-content-center no-underline">
                <Button>Go to my rsvp'd events</Button>
            </Link>
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