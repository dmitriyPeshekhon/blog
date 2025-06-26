import { getUserByLogin, registrationUser } from '../api';
import { session } from '../sessions';
import { userTransform } from '../transformers';

export const registration = async (enteredLogin, enteredPassword) => {
	const findedUsers = await getUserByLogin(enteredLogin);

	if (!findedUsers) {
		return {
			error: 'Не удалось получить ответ от сервера',
			response: null,
		};
	}

	if (findedUsers[0]) {
		return {
			error: 'Пользователь с таким логином уже существует',
			response: null,
		};
	}

	if (!findedUsers[0]) {
		const addiedUser = await registrationUser(enteredLogin, enteredPassword);
		if (addiedUser) {
			const { id, registerAt, roleId } = userTransform(addiedUser);

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
			error: 'Не удалось создать нового пользователя',
			response: null,
		};
	}

	return {
		error: 'Не удалось получить ответ от сервера',
		response: null,
	};
};
