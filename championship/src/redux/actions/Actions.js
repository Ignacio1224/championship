function createUser(user) {
	return {
		type: 'CREATE_USER',
		user
	};
}

function createChampionship(championship) {
	return {
		type: 'CREATE_CHAMPIONSHIP',
		championship
	};
}

export { createUser, createChampionship };
