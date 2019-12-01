import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import UseOneEvent from '../hooks/UseOneEvent';
import EventDetails from '../components/LargeEventCard';
import Button from '../components/RSVPButton';

const Event = props => {
    const id = props.match.params.id;
    let list = [];
    const {
        Title,
        Desc,
        DateAndTime,
        Location,
        RSVPs,
    } = UseOneEvent(id);

    if (RSVPs) list = RSVPs.split(", ")

    const date = moment(DateAndTime).format('MMMM Do YYYY');
    const time = moment(DateAndTime).format('h:mm a');

    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-4">
                <Button color="#FFC5AB">Going</Button>
                <Button color="#dc3445">Not Going</Button>
                <div className="attendees-content">
                    <div className="row">Others going:</div>
                    <div className="row">
                        {list.map(RSVPID => {
                            const imageData = import(`../user_images/user-${RSVPID}.png`).then(img => img.default).catch(err => console.log(err))
                            return (
                                <Link to="/" key={RSVPID}>
                                    <img style={{ width: 70, padding: 5 }} src={imageData} alt="pic" />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <EventDetails event={{
                    title: Title,
                    date,
                    time,
                    location: Location,
                    description: Desc,
                }} />
            </div>                
            <div className="col-md-2"></div>
        </div>
    )
}

export default Event;