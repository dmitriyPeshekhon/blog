import { commentTransform } from '../transformers';

export const getComments = (postId) =>
	fetch(`http://localhost:3000/comments${postId ? `?post_id=${postId}` : ''}`)
		.then((res) => res.json())
		.then((comments) => comments.map((comment) => commentTransform(comment)))
		.catch(() => null);
