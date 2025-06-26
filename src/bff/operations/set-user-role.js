import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { updateUserRole } from '../api';

export const setUserRole = async (hashId, userId, roleId) => {
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

	const resp = await updateUserRole(userId, roleId);

	if (!resp) {
		return {
			error: 'Не удалось обновить роль у пользователя',
			response: null,
		};
	}

	return {
		error: null,
		response: null,
	};
};
