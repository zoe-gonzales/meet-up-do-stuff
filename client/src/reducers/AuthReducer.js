const initialState = {
    inputs: {
        username: '',
        password: '',
        confirmPassword: '',
    }
}

const Auth = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_INPUTS':
            let  { username, password, confirmPassword } = action.data;
            return Object.assign({}, state, {
                inputs: {
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
                }
            });
        default:
            return state;
    }
}

export default Auth;