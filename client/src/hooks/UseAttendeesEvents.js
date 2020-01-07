import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/eventActions';
import API from '../utils/API';

const UseAttendeesEvents = userID => {
    const events = useSelector(state => state.Event.events);
    const dispatch = useDispatch();

    useEffect(() => {
      API
        .getUsersEvents(userID)
        .then(events => dispatch(actions.populateEvents(events.data)))
        .catch(err => console.log(err));
    }, [dispatch, userID]);
    
    return events;
}

export default UseAttendeesEvents;