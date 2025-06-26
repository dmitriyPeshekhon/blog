import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { generateDate } from '../utils';
import { createPost } from '../api';

export const addPost = async (hashId, postParams) => {
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

	const resp = await createPost({ ...postParams, publishedAt: generateDate() });

	if (!resp) {
		return {
			error: 'Не удалось добавить пост',
			response: null,
		};
	}

	return {
		error: null,
		response: resp,
	};
};
