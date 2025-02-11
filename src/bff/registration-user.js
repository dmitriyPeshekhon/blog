import { generateDate } from './generate-date';
import { ROLE } from '../constants';

export const registrationUser = (login, password) =>
	fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login: login,
			password: password,
			created_at: generateDate(),
			role_id: ROLE.READER,
		}),
	})
		.then((resp) => resp.json())
		.catch(() => null);
