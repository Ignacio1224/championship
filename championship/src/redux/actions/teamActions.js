function createTeam(team) {
	return {
		type: 'CREATE_TEAM',
		team
	};
}

function deleteTeam(team) {
	return {
		type: 'DELETE_TEAM',
		team
	};
}

export { createTeam, deleteTeam };
