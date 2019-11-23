import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/eventActions';
import API from '../utils/API';

const UseAllEvents = () => {
    const events = useSelector(state => state.Event.events);
    const dispatch = useDispatch();

    useEffect(() => {
      API
        .getAllEvents()
        .then(events => dispatch(actions.populateEvents(events.data)))
        .catch(err => console.log(err));
    }, [dispatch]);
    
    return events;
}

export default UseAllEvents;