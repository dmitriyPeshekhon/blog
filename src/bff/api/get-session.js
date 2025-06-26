import { sessionTransform } from '../transformers';

export const getSession = (id) => {
	return id
		? fetch(`http://localhost:3000/sessions/${id}`)
				.then((res) => res.json())
				.then((session) => sessionTransform(session))
				.catch(() => null)
		: null;
};
