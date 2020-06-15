const initialState = {
    users: []
};

const reducer = (state = initialState, action) => {
    if(action.type === 'search') {
        return {
            ...state,
            users: [...action.users]
        }
    }
    return state;
};

export default reducer;