const initialState = {
    inputs: {
        zipCode: '',
    }
}

const Search = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_SEARCH_INPUTS':
            const { zipCode } = action.data;
            return {
                ...state,
                inputs: {
                    zipCode: zipCode,
                }
            };
        default:
            return state;
    }
}

export default Search;