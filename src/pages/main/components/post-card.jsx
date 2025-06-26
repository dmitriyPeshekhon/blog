import { Link } from 'react-router-dom';
import { Icon } from '../../../components';

export const PostCard = ({ postId, imageUrl, title, publishedAt, countComments }) => {
	return (
		<Link to={`/post/${postId}`} className="post-card">
			<img src={imageUrl} alt={title} className="img-post-card" />
			<div className="post-card-footer">
				<h4>{title}</h4>
				<div className="post-card-footer-panel">
					<div className="post-card-footer-panel-published-at">
						<Icon iconCode="fa-calendar" margin="0 5px 0 0" />
						<span>{publishedAt}</span>
					</div>
					<div className="post-card-footer-panel-comments">
						<Icon iconCode="fa-comment-o" margin="0 5px 0 0" />
						<span>{countComments}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};
