function createTask(task) {
	return {
		type: 'CREATE_TASK',
		task
	};
}

function deleteTask(task) {
	return {
		type: 'DELETE_TASK',
		task
	};
}

export { createTask, deleteTask };
