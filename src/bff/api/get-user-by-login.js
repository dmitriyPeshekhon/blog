export const getUserByLogin = (login) =>
	fetch(`http://localhost:3000/users?login=${login}`)
		.then((resp) => resp.json())
		.then((usersArray) => usersArray)
		.catch(() => null);
