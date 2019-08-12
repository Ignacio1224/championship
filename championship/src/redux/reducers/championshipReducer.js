export default function championshipReducer(state = {}, action) {
	switch (action.type) {
		case 'CREATE_CHAMPIONSHIP':
			return { ...state, championship: action.championship };

		case 'DELETE_CHAMPIONSHIP':
			return { ...state, championship: {} };

		default:
			return state;
	}
}
