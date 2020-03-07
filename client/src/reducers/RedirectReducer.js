const initialState = {
    redirect: false,
    redirectId: 0,
}

const Redirect = (state = initialState, action) => {
    switch(action.type) {
        case 'REDIRECT_PAGE':
            const { redirect, redirectId } = action.data;
            return {
                ...state,
                redirect,
                redirectId
            };
        default:
            return state;
    }
}

export default Redirect;

