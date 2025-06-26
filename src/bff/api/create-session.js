export const createSession = (hash, userId) =>
	fetch('http://localhost:3000/sessions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hash: hash,
			user_id: userId,
		}),
	})
		.then((res) => (res.ok ? res.json() : null))
		.then((session) => (session ? { id: session.id, hash: session.hash } : null))
		.catch(() => null);
