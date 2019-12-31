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

const EventAsUser = props => {
    // using importAll to read images for user_images directory
    const images = importAll(require.context('../user_images', false, /\.(png)$/));
    const eventID = props.match.params.eventID;
    const userID = props.match.params.userID;
    let list = [];
    let userGoing = false;

    const {
        Title,
        Desc,
        DateAndTime,
        Location,
        RSVPs,
    } = UseOneEvent(eventID);
    
    // create array out of string of rsvp ids
    if (RSVPs !== '---' && RSVPs) list = RSVPs.split(", ")
    
    // toggle the rsvp button based on whether user is attending or not
    if (list.includes(userID)) userGoing = true
    else userGoing = false

    // make day and time readable
    const date = moment(DateAndTime).format('MMMM Do YYYY');
    const time = moment(DateAndTime).format('h:mm a');

    const handleClick = e => {
        const { event, user } = e.target.dataset
        // Make API request to updates RSVPs for the event and the user
    }

    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-4">
                <Button 
                    handleClick={handleClick}
                    color={userGoing ? "#dc3445" : "#FFC5AB" }
                    event={eventID}
                    user={userID}
                >{userGoing ? "Not Going" : "Going"}</Button>
                <div className="attendees-content">
                    <div className="row">Others going:</div>
                    <div className="row">
                        { list.length === 0 ? (
                            <p>No one is attending this event yet.</p>
                        ) : (
                            list.map(RSVPID => {
                                return (
                                    <Link to={`/profile/${RSVPID}`} key={RSVPID}>
                                        <img style={{ width: 70, padding: 5 }} src={images[`user-${RSVPID}.png`]} alt="pic" />
                                    </Link>
                                )
                            })
                        )}
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

export default EventAsUser;