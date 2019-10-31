const initialState = {
    inputs: {
        zipCode: '',
    }
}

const Search = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_SEARCH_INPUTS':
            let { zipCode } = action.data;
            return Object.assign({}, state, {
                inputs: {
                    zipCode: zipCode,
                }
            })
        default:
            return state;
    }
}

export default Search;