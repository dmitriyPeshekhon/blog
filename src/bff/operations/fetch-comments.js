import { getComments, getUsers } from '../api';

export const fetchComments = async (postId) => {
	const users = await getUsers();
	const comments = await getComments(postId);

	if (!comments || !users) {
		return {
			error: 'Ошибка, не удалось получить комментарии',
			response: null,
		};
	}

	const commentsWithAuthor = comments.map((comment) => ({
		...comment,
		author: users.find((user) => user.id === comment.authorId).login,
	}));

	return {
		error: null,
		response: commentsWithAuthor,
	};
};
