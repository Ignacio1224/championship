export default function userReducer(state = {}, action) {
    switch (action.type) {
        case 'CREATE_USER':
            return { ...state, user: action.user };

        case 'DELETE_USER':
            delete state.user;
            return {...state}

        default:
            return state;
    }
}