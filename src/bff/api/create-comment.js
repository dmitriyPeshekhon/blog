import { commentTransform } from '../transformers';

export const createComment = ({ userId, postId, content, publishedAt }) =>
	fetch('http://localhost:3000/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			post_id: postId,
			author_id: userId,
			content,
			published_at: publishedAt,
		}),
	})
		.then((res) => (res.ok ? res.json() : null))
		.then((comment) => (comment ? commentTransform(comment) : null))
		.catch(() => null);
