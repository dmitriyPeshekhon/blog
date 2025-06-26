import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { getUsers } from '../api';

export const fetchUsers = async (hashId) => {
	const accessRoles = [ROLES.ADMIN];

	const accessRes = await session.access(hashId, accessRoles);

	if (accessRes.error) {
		return {
			error: accessRes.error,
			response: null,
		};
	}

	if (!accessRes.access) {
		return {
			error: 'Недостаточно прав для выполнения операции',
			response: null,
		};
	}

	const users = await getUsers();

	if (!users) {
		return {
			error: 'Ошибка, не удалось получить пользователей',
			response: null,
		};
	}

	return {
		error: null,
		response: users,
	};
};
