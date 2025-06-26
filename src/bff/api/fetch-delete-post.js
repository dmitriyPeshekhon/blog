export const fetchDeletePost = (id) =>
	fetch(`http://localhost:3000/posts/${id}`, {
		method: 'DELETE',
	})
		.then((res) => res.ok)
		.catch(() => null);
