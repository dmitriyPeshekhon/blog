import { ROLES } from '../constants/roles';
import { session } from '../sessions';
import { fetchDeletePost, getComments, fetchDeleteComment } from '../api';

export const deletePost = async (hashId, id) => {
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

	const res = await fetchDeletePost(id);

	if (!res) {
		return {
			error: 'Не удалось удалить пост',
			response: null,
		};
	}

	const comments = await getComments(id);

	await Promise.all(comments.map(({ id: commentId }) => fetchDeleteComment(commentId)));

	return {
		error: null,
		response: null,
	};
};
