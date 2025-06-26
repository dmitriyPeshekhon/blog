export const fetchDeleteUser = (id) =>
	fetch(`http://localhost:3000/users/${id}`, {
		method: 'DELETE',
	})
		.then((res) => res.ok)
		.catch(() => null);
