const initialState = {
    redirect: false,
    redirectId: 0,
}

const Redirect = (state = initialState, action) => {
    switch(action.type) {
        case 'REDIRECT_PAGE':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

export default Redirect;

