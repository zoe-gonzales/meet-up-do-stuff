import React from 'react';
import { Link } from 'react-router-dom';
import UseOneEvent from '../hooks/UseOneEvent';
import EventDetails from '../components/LargeEventCard';
import Button from '../components/RSVPButton';
import pic from '../images/pic.png';

const attendees = [pic, pic, pic, pic, pic, pic, pic, pic];

const Event = props => {
    const id = props.match.params.id;
    const {
        Title,
        DateAndTime,
        Location,
        Desc,
    } = UseOneEvent(id);

    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-4">
                <Button color="#FFC5AB">Going</Button>
                <Button color="#dc3445">Not Going</Button>
                <div className="attendees-content">
                    <div className="row">Others going:</div>
                    <div className="row">
                        {attendees.map(image => {
                            return (
                                <Link to="/">
                                    <img style={{ width: 70, padding: 5 }} src={image} key={attendees.indexOf(image)} alt="pic" />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <EventDetails event={{
                    title: Title,
                    date: DateAndTime,
                    time: DateAndTime,
                    location: Location,
                    description: Desc,
                }} />
            </div>                
            <div className="col-md-2"></div>
        </div>
    )
}

export default Event;