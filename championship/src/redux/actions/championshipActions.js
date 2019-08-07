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

export { createChampionship, deleteChampionship };
