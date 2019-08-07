function createUser(user) {
	return {
		type: 'CREATE_USER',
		user
	};
}

function deleteUser() {
	return {
		type: 'DELETE_USER'
	};
}

export { createUser, deleteUser };