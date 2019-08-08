function createTeam(team) {
	return {
		type: 'CREATE_TEAM',
		team
	};
}

export { createTeam };