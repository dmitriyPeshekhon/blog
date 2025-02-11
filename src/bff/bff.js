import { getUser } from './get-user';
import { createSession } from './create-session';
import { registrationUser } from './registration-user';

export const server = {
	authorize: async (enteredLogin, enteredPassword) => {
		const usersArray = await getUser(enteredLogin);

		if (!usersArray) {
			return {
				error: 'Ошибка авторизации',
				session: null,
			};
		} else if (usersArray[0]) {
			return {
				error: 'Неправильно введен логин или пароль',
				session: null,
			};
		} else if (usersArray[0].password === enteredPassword) {
			return {
				error: null,
				session: createSession(usersArray[0].role_id),
			};
		}
	},
	registration: async (enteredLogin, enteredPassword) => {
		const usersArray = await getUser(enteredLogin);

		if (!usersArray) {
			return {
				error: 'Ошибка регистрации',
				session: null,
			};
		} else if (usersArray[0]) {
			return {
				error: 'Пользователь с таким логином уже существует',
				session: null,
			};
		} else if (!usersArray[0]) {
			const addiedUser = await registrationUser(enteredLogin, enteredPassword);
			if (addiedUser) {
				return {
					error: null,
					session: createSession(addiedUser.role_id),
				};
			} else {
				return {
					error: 'Ошибка регистрации',
					session: null,
				};
			}
		}
	},
};
