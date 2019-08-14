export default function teamReducer(
	state = { teams: [], positions: [], scorers: [], fairPlay: [] },
	action
) {
	switch (action.type) {
		case 'CREATE_TEAM':
			return {
				...state,
				teams: [...state.teams, action.team]
			};

		case 'DELETE_TEAM':
			return {
				...state,
				teams: [],
				positions: [],
				scorers: [],
				fairPlay: []
			};

		default:
			return state;
	}
}
