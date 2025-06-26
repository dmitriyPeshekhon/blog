import { userTransform } from '../transformers';

export const getUserById = (id) =>
	fetch(`http://localhost:3000/users/${id}`)
		.then((resp) => resp.json())
		.then((user) => userTransform(user))
		.catch(() => null);
