export const commentTransform = ({ id, post_id, author_id, content, published_at }) => ({
	id: id,
	postId: post_id,
	authorId: author_id,
	content: content,
	publishedAt: published_at,
});
