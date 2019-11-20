import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../components/Heading';
import EventDetails from '../components/LargeEventCard';
import Button from '../components/RSVPButton';
import pic from '../images/pic.png';

const attendees = [pic, pic, pic, pic, pic, pic, pic, pic];

const Event = ({ event }) => {
    return (
        <div>
            <Heading />
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
                    <EventDetails event={event} />
                </div>                
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default Event;