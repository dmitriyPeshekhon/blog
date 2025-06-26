import { postTransform } from '../transformers';

export const getPost = (postId) =>
	fetch(`http://localhost:3000/posts/${postId}`)
		.then((res) => {
			if (res.status === 404) {
				return null;
			}
			return res.json();
		})
		.then((post) => (post ? postTransform(post) : null))
		.catch(() => null);
