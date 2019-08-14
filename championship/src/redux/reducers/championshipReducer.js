export default function championshipReducer(state = {}, action) {
	switch (action.type) {
		case 'CREATE_CHAMPIONSHIP':
			return { ...state, championship: action.championship };

		case 'DELETE_CHAMPIONSHIP':
			return { ...state, championship: {} };

		case 'CREATE_MATCHES':
			return { ...state, matches: action.matches };

		case 'UPDATE_MATCH':
			let dumpedMatches = { ...state, matches: [...state.matches] };
			dumpedMatches = dumpedMatches.matches;

			let matchF = dumpedMatches.filter(
				m => m._id === action.match._id
			)[0];

			// IMPORTANTE: Detecta mutaciones no solo por fuera del objeto, sino que dentro del mismo tambien
			matchF = {
				...matchF,
				team1: action.match.team1,
				team2: action.match.team2,
				events: action.match.events
			};

			let otherMatches = [
				...dumpedMatches.filter(m => m._id !== action.match._id)
			];

			return { ...state, matches: [...otherMatches, matchF] };

		case 'ADD_POSITION':
			action.positions.sort((a, b) => {
				let sum = b.pts - a.pts;
				if (sum === 0) {
					sum = b.goals - a.goals;
					if (sum === 0) sum = b.favGoal - a.favGoal;
				}
				return sum;
			});
			return { ...state, positions: action.positions };

		case 'ADD_SCORER':
			action.positions.sort((a, b) => b.pts - a.pts);
			return { ...state, scorers: action.scorers };

		case 'ADD_FAIRPLAY':
			action.positions.sort((a, b) => a.pos - b.pos);
			return { ...state, fairPlay: action.fairPlay };
		default:
			return state;
	}
}
