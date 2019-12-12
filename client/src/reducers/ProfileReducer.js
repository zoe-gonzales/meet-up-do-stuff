const initialState = {
    currentProfile: {},
    inputs: {
        nickName: '',
        location: '',
        interests: [],
    }
}

const Profile = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_PROFILE_INPUTS':
            const { nickName, location, interests } = action.data;
            return Object.assign({}, state, {
                inputs: {
                    nickName,
                    location,
                    interests,
                }
            });
        case 'GET_ONE_PROFILE':
            return Object.assign({}, state, {
                currentProfile: action.data
            });
        default:
            return state;
    }
}

export default Profile;