import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { updatePost } from '../api';

export const setPost = async (hashId, postParams) => {
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

	const resp = await updatePost(postParams);

	if (!resp) {
		return {
			error: 'Не удалось обновить пост',
			response: null,
		};
	}

	return {
		error: null,
		response: null,
	};
};
