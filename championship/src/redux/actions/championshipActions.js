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

export { createChampionship, deleteChampionship, createMatches };
