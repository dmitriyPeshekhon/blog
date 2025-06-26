export const getRoles = () =>
	fetch(`http://localhost:3000/roles`)
		.then((resp) => resp.json())
		.then((rolesArray) => rolesArray)
		.catch(() => null);
