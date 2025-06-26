export const fetchDeleteComment = (id) =>
	fetch(`http://localhost:3000/comments/${id}`, {
		method: 'DELETE',
	})
		.then((res) => res.ok)
		.catch(() => null);
