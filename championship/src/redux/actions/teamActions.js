function createTeam(team) {
	return {
		type: 'CREATE_TEAM',
		team
	};
}

function addPositions(positions) {
	return {
		type: 'ADD_POSITIONS',
		positions
	};
}

function addScorers(scorers) {
	return {
		type: 'ADD_SCORERS',
		scorers
	};
}

function addFairPlay(fairPlay) {
	return {
		type: 'ADD_FAIRPLAY',
		fairPlay
	};
}

export { createTeam, addPositions, addScorers, addFairPlay };