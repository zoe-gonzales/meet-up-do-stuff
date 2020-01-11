import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/eventActions';
import API from '../utils/API';

const UseEvents = id => {
    const currentEvent = useSelector(state => state.Event.currentEvent);
    const dispatch = useDispatch();

    useEffect(() => {
      API
        .getOneEvent(id)
        .then(event => dispatch(actions.getOneEvent(event.data)))
        .catch(err => console.log(err));
    }, [id, dispatch]);
    
    return currentEvent;
}

export default UseEvents;