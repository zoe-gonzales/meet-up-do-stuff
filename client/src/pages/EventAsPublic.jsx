import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import UseOneEvent from '../hooks/UseOneEvent';
import EventDetails from '../components/LargeEventCard';
import pic from '../images/default.jpg';

const EventAsUser = props => {
    const id = props.match.params.id;
    const {
        Title,
        Desc,
        DateAndTime,
    } = UseOneEvent(id);
    
    // make day and time readable
    const date = moment(DateAndTime).format('MMMM Do YYYY');
    const time = moment(DateAndTime).format('h:mm a');

    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-4">
                <p><Link to="/login">Log in</Link> to RSVP to this event!</p>
                <p><Link to="/login">Log in</Link> to see others going to this event</p>
                <img src={pic} alt="default event" width="360"></img>
            </div>
            <div className="col-md-4">
                <EventDetails event={{
                    title: Title,
                    date,
                    time,
                    location: "Log in to see location",
                    description: Desc,
                }} />
            </div>                
            <div className="col-md-2"></div>
        </div>
    )
}

export default EventAsUser;