export const postTransform = ({ id, title, content, image_url, published_at }) => ({
	id: id,
	title: title,
	content: content,
	imageUrl: image_url,
	publishedAt: published_at,
});
