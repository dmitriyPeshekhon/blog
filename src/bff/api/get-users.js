import { userTransform } from '../transformers';

export const getUsers = () =>
	fetch(`http://localhost:3000/users`)
		.then((resp) => resp.json())
		.then((usersArray) => usersArray.map((user) => userTransform(user)))
		.catch(() => null);
