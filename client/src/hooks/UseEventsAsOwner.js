import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/eventActions';
import API from '../utils/API';

const UseEventsAsOwner = id => {
    const events = useSelector(state => state.Event.events);
    const dispatch = useDispatch();

    useEffect(() => {
      API
        .getEventsAsOwner(id)
        .then(events => dispatch(actions.populateEvents(events.data)))
        .catch(err => console.log(err));
    }, [dispatch, id]);

    const removeEvent = id => {
      dispatch(actions.removeEvent(id))
    }
    
    return {
      events,
      removeEvent,
    };
}

export default UseEventsAsOwner;