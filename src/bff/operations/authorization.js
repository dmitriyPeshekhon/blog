import { getUserByLogin } from '../api';
import { userTransform } from '../transformers';
import { session } from '../sessions';

export const authorize = async (enteredLogin, enteredPassword) => {
	const findedUsers = await getUserByLogin(enteredLogin);

	if (!findedUsers) {
		return {
			error: 'Не удалось получить ответ от сервера',
			response: null,
		};
	}

	if (!findedUsers[0]) {
		return {
			error: 'Неправильно введен логин или пароль',
			response: null,
		};
	}

	if (findedUsers[0].password === enteredPassword) {
		const { id, registerAt, roleId } = userTransform(findedUsers[0]);

		const sessionCreateRes = await session.create(id);

		if (sessionCreateRes.error) {
			return {
				error: sessionCreateRes.error,
				response: null,
			};
		}

		return {
			error: null,
			response: {
				id,
				login: enteredLogin,
				roleId,
				registerAt,
				session: sessionCreateRes.session,
			},
		};
	}

	return {
		error: 'Не удалось получить ответ от сервера',
		response: null,
	};
};
