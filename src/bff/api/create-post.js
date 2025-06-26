import { postTransform } from '../transformers';

export const createPost = ({ title, content, imageUrl, publishedAt }) =>
	fetch('http://localhost:3000/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			image_url: imageUrl,
			content,
			published_at: publishedAt,
		}),
	})
		.then((res) => (res.ok ? res.json() : null))
		.then((newPost) => (newPost ? postTransform(newPost) : null))
		.catch(() => null);
