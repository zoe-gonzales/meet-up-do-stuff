const initialState = {
    inputs: {
        username: '',
        password: '',
        confirmPassword: '',
    },
    redirect: false,
    redirectId: 0,
}

const Auth = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_AUTH_INPUTS':
            let  { username, password, confirmPassword } = action.data;
            return Object.assign({}, state, {
                inputs: {
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
                }
            });
        case 'REDIRECT_PAGE':
            return Object.assign({}, state, { redirect: action.data });
        case 'SET_ID':
            return Object.assign({}, state, { redirectId: action.data });
        default:
            return state;
    }
}

export default Auth;