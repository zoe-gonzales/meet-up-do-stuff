import types from './types';

const profileActions = {
    getOneProfile(data) {
        return (dispatch) => {
            dispatch(types.getOneProfile(data));
        }
    },
}

export default profileActions;