import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { fetchDeleteComment } from '../api';

export const deleteComment = async (hashId, id) => {
	const accessRoles = [ROLES.ADMIN, ROLES.MODERATOR];

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

	const res = await fetchDeleteComment(id);

	if (!res) {
		return {
			error: 'Не удалось удалить комментарий',
			response: null,
		};
	}

	return {
		error: null,
		response: null,
	};
};
