import { getUser } from './get-user';
import { session } from './sessions';
import { registrationUser } from './registration-user';

export const server = {
	authorize: async (enteredLogin, enteredPassword) => {
		const usersArray = await getUser(enteredLogin);

		if (!usersArray) {
			return {
				error: 'Ошибка авторизации',
				userData: null,
			};
		} else if (usersArray[0]) {
			return {
				error: 'Неправильно введен логин или пароль',
				userData: null,
			};
		} else if (usersArray[0].password === enteredPassword) {
			const { id, login, role_id } = usersArray[0];

			const authUser = {
				id: id,
				login: login,
				roleId: role_id,
			};

			return {
				error: null,
				userData: session.create(authUser),
			};
		}
	},
	registration: async (enteredLogin, enteredPassword) => {
		const usersArray = await getUser(enteredLogin);

		if (!usersArray) {
			return {
				error: 'Ошибка регистрации',
				userData: null,
			};
		} else if (usersArray[0]) {
			return {
				error: 'Пользователь с таким логином уже существует',
				userData: null,
			};
		} else if (!usersArray[0]) {
			const addiedUser = await registrationUser(enteredLogin, enteredPassword);
			if (addiedUser) {
				const user = {
					id: addiedUser.id,
					login: addiedUser.login,
					roleId: addiedUser.role_id,
				};

				return {
					error: null,
					userData: session.create(user),
				};
			} else {
				return {
					error: 'Ошибка регистрации',
					userData: null,
				};
			}
		}
	},
};
