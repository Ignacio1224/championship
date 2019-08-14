function createChampionship(championship) {
	return {
		type: 'CREATE_CHAMPIONSHIP',
		championship
	};
}

function deleteChampionship(championship) {
	return {
		type: 'DELETE_CHAMPIONSHIP',
		championship
	};
}

function createMatches(matches) {
	return {
		type: 'CREATE_MATCHES',
		matches
	};
}

function updateMatch(match) {
	return {
		type: 'UPDATE_MATCH',
		match
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

export {
	createChampionship,
	deleteChampionship,
	createMatches,
	updateMatch,
	addPositions,
	addScorers,
	addFairPlay
};
