export default function championshipReducer(state = {}, action) {
	switch (action.type) {
		case 'CREATE_USER':
			return {...state, user: action.user};

		case 'CREATE_CHAMPIONSHIP':
			return {...state, championship: action.championship};
		
		default:
			return state;
	}
}
