export default function championshipReducer(state = {}, action) {
	switch (action.type) {
		case 'CREATE_CHAMPIONSHIP':
			return { ...state, championship: action.championship };

		case 'DELETE_CHAMPIONSHIP':
			return { ...state, championship: {} };

		case 'CREATE_MATCHES':
			return { ...state, matches: action.matches };

		case 'UPDATE_MATCH':
			let matchF = [
				...state.matches.filter(m => m._id === action.match._id)
			];
			matchF[0].team1 = action.match.team1;
			matchF[0].team2 = action.match.team2;
			matchF[0].events = action.match.events;

			debugger;

			let otherMatches = [
				...state.matches.filter(m => m._id !== action.match._id)
			];

			otherMatches = [...matchF, ...otherMatches];

			let a = [];
			otherMatches.forEach(m => (a = [...a, { ...m }]));

			return { ...state, matches: a };

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
