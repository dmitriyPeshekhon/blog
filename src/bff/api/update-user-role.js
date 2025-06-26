export const updateUserRole = async (id, roleId) =>
	fetch(`http://localhost:3000/users/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			role_id: roleId,
		}),
	})
		.then((res) => res.ok)
		.catch(() => null);
