import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { getRoles } from '../api';

export const fetchRoles = async (hashId) => {
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

	const roles = await getRoles();

	if (!roles) {
		return {
			error: 'Ошибка, не удалось получить роли',
			response: null,
		};
	}

	return {
		error: null,
		response: roles,
	};
};
