export default function teamReducer(state = {}, action) {
    switch (action.type) {
        case 'CREATE_TEAMT':
            return { ...state, team: action.team };

        default:
            return state;
    }
}