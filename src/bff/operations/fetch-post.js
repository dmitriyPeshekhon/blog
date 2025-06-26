import { getPost } from '../api';

export const fetchPost = async (postId) => {
	const post = await getPost(postId);

	if (!post) {
		return {
			error: 'Не удалось загрузить пост',
			response: null,
		};
	}

	return {
		error: null,
		response: post,
	};
};
