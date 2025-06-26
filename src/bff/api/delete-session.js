export const deleteSession = (id) =>
	fetch(`http://localhost:3000/sessions/${id}`, {
		method: 'DELETE',
	})
		.then((res) => res.ok)
		.catch(() => null);
