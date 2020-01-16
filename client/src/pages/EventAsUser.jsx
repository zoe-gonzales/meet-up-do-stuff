import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../components/Heading';
import moment from 'moment';
import UseOneEvent from '../hooks/UseOneEvent';
import UseProfile from '../hooks/UseOneProfile';
import ToggleUserGoing from '../hooks/ToggleUserGoing';
import EventDetails from '../components/LargeEventCard';
import Button from '../components/RSVPButton';
import validate from '../utils/validate';
import API from '../utils/API';

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
    let userAttending;

    const eventData = UseOneEvent(eventID);
    let {
        Title,
        Desc,
        DateAndTime,
        Location,
        RSVPs,
    } = eventData;

    const profile = UseProfile(userID);
    
    // create array out of string of rsvp ids
    if (RSVPs !== '---' && RSVPs) {
        list = RSVPs.split(", ")
        // toggle the rsvp button based on whether user is attending or not
        if (list.includes(userID)) userAttending = true
        else userAttending = false
    }

    // ToggleUserGoing uses local state to manage the user's RSVP
    const {
        userGoing,
        handleRSVP,
    } = ToggleUserGoing(userAttending, e => {
        const { event, user } = e.target.dataset
        // updating RSVPs list for user
        let userRSVPs = [];
        // checking if RSVPs is default value
        if (profile.RSVPS !== '---') userRSVPs = [...profile.RSVPS]
        
        if (validate.arrayIncludes(event, userRSVPs)) {
            // handle if user is already RSVP'd
            userRSVPs = userRSVPs.filter(u => u !== event)
        } else {
            userRSVPs.push(`${event}`)
        }
        profile.RSVPS = userRSVPs.join(",")
        if (profile.RSVPS === "") profile.RSVPS = '---'
        
        // updating RSVPs list for event
        let eventRSVPs;
        if (eventData.RSVPs === '---') eventRSVPs = []
        else eventRSVPs = [...eventData.RSVPs]
        
        if (validate.arrayIncludes(user, eventRSVPs)) {
            // handle if user is already RSVP'd
            eventRSVPs = eventRSVPs.filter(e => e !== user)
        } else {
            eventRSVPs.push(`${user}`)
        }
        eventData.RSVPs = eventRSVPs.join(",")
        if (eventData.RSVPs === "") eventData.RSVPs = '---'
            
        // Make API request to updates RSVPs for the event and the user
        API
          .updateProfile(user, profile)
          .then(res => {
            API
              .updateEvent(event, eventData)
              .then(res => res)
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
    })

    // make day and time readable
    const date = moment(DateAndTime).format('MMMM Do YYYY');
    const time = moment(DateAndTime).format('h:mm a');

    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    <Button 
                        handleClick={handleRSVP}
                        color={userGoing ? "#dc3445" : "#FFC5AB" }
                        event={eventID}
                        user={userID}
                    >{userGoing ? "un-RSVP" : "RSVP"}</Button>
                    <div className="attendees-content">
                        <div className="row">Others going:</div>
                        <div className="row">
                            {list.length === 0 ? (
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
        </div>
    )
}

export default EventAsUser;