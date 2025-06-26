import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPost, selectUserRole } from '../../../../redux/selectors';
import { ROLE } from '../../../../constants';
import { H2, Icon } from '../../../../components';
import { SpecialPannel } from '../SpecialPannel/special-pannel';
import './post-content.css';

export const PostContent = () => {
	const post = useSelector(selectPost);
	const userRole = useSelector(selectUserRole);
	const navigate = useNavigate();

	return (
		<div className="content-post">
			<img
				src={post.imageUrl === '' ? '/' : post.imageUrl}
				alt={post.title}
				className="img-post"
			/>
			<H2 margin="0 0 15px 0">{post.title}</H2>
			<SpecialPannel
				postId={post.id}
				publishedAt={post.publishedAt}
				showButtons={userRole === ROLE.ADMIN}
				renderButton={
					<Icon
						iconCode="fa-pencil-square-o"
						size="26px"
						margin="3px 0 0"
						onClick={() => navigate(`/post/${post.id}/edit`)}
					/>
				}
			/>
			<span className="post-content">{post.content}</span>
		</div>
	);
};
