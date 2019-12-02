import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import UseOneEvent from '../hooks/UseOneEvent';
import EventDetails from '../components/LargeEventCard';
import Button from '../components/RSVPButton';

// importAll checks each image and updated its path
const importAll = c => {
    let imgs = {}
    c.keys().forEach(image => {imgs[image.replace('./', '')] = c(image); });
    return imgs
}

const Event = props => {
    // using importAll to read images for user_images directory
    const images = importAll(require.context('../user_images', false, /\.(png)$/));

    // match the id to identify when event to retrieve
    const id = props.match.params.id;

    let list = [];
    const {
        Title,
        Desc,
        DateAndTime,
        Location,
        RSVPs,
    } = UseOneEvent(id);

    // create array out of string of rsvp ids
    if (RSVPs) list = RSVPs.split(", ")

    // make day and time readable
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
                            return (
                                <Link to={`/user/${RSVPID}`} key={RSVPID}>
                                    <img style={{ width: 70, padding: 5 }} src={images[`user-${RSVPID}.png`]} alt="pic" />
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