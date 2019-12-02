import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions/profileActions';
import API from '../utils/API';

const UseProfile = id => {
    const currentProfile = useSelector(state => state.Profile.currentProfile);
    const dispatch = useDispatch();

    useEffect(() => {
        API
        .getOneProfile(id)
        .then(profile => dispatch(actions.getOneProfile(profile.data)))
        .catch(err => console.log(err));
    }, [id, dispatch]);

    return currentProfile;
}

export default UseProfile;