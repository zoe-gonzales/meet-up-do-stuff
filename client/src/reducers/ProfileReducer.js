const initialState = {
    inputs: {
        nickName: '',
        location: '',
    }
}

const Profile = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_PROFILE_INPUTS':
            const { nickName, location } = action.data;
            return Object.assign({}, state, {
                inputs: {
                    nickName: nickName,
                    location: location,
                }
            });
        default:
            return state;
    }
}

export default Profile;