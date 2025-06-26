import { getPosts, getComments } from '../api';

export const fetchPosts = async (page, limit, searchPhrase) => {
	const [postsAndLinks, comments] = await Promise.allSettled([
		getPosts(page, limit, searchPhrase),
		getComments(),
	]);

	if (postsAndLinks.status === 'rejected' || !postsAndLinks.value) {
		return {
			error: 'Ошибка, не удалось получить посты',
			response: null,
		};
	}

	const { posts, links } = postsAndLinks.value;

	if (comments.status === 'rejected' || !comments.value) {
		return {
			error: null,
			response: {
				posts: posts.map((post) => ({ ...post, countComments: 0 })),
				links,
			},
		};
	}

	return {
		error: null,
		response: {
			posts: posts.map((post) => ({
				...post,
				countComments: comments.value.filter(
					(comment) => comment.postId === post.id,
				).length,
			})),
			links,
		},
	};
};
