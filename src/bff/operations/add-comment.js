import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { createComment } from '../api';
import { generateDate } from '../utils';

export const addComment = async (hashId, commentData) => {
	const accessRoles = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER];

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

	const comment = await createComment({ ...commentData, publishedAt: generateDate() });

	if (comment.error) {
		return {
			error: comment.error,
			response: null,
		};
	}

	return {
		error: null,
		response: comment,
	};
};
