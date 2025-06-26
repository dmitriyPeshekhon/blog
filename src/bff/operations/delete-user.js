import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { fetchDeleteUser } from '../api';

export const deleteUser = async (hashId, id) => {
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

	const res = await fetchDeleteUser(id);

	if (!res) {
		return {
			error: 'Не удалось удалить пользователя',
			response: null,
		};
	}

	return {
		error: null,
		response: null,
	};
};
