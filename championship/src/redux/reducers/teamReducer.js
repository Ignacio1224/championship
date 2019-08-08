export default function teamReducer(state = { team: [], positions: [], scorers: [], fairPlay: [] }, action) {
    switch (action.type) {
        case 'CREATE_TEAMT':
            return { ...state, team: action.team };

        case 'ADD_POSITION':
            // positions: [{pos: NUMBER, team: STRING}, ...]
            action.positions.sort((a, b) => b.pos - a.pos);
            return { ...state, positions: action.positions }

        case 'ADD_SCORER':
            // socorers: [{pos: NUMBER, player: STRING}, ...]
            action.positions.sort((a, b) => b.pos - a.pos);
            return { ...state, scorers: action.scorers }

        case 'ADD_FAIRPLAY':
            // fairPlay: [{pos: NUMBER, team: STRING}, ...]
            action.positions.sort((a, b) => b.pos - a.pos);
            return { ...state, fairPlay: action.fairPlay }

        default:
            return state;
    }
}