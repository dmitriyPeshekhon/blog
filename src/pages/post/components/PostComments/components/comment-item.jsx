import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, openModal } from '../../../../../redux/actions';
import { server } from '../../../../../bff/bff';
import { errorMessage } from '../../../../../hooks';
import { Loader, Icon } from '../../../../../components';
import { ROLE } from '../../../../../constants';

export const CommentItem = ({
	id,
	author,
	content,
	publishedAt,
	userSession,
	userRoleId,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const commentDelete = async () => {
		setIsLoading(true);

		const deleteCommentRes = await server.deleteComment(userSession.id, id);

		if (deleteCommentRes.error) {
			errorMessage(deleteComment.error);
			setIsLoading(false);
			return;
		}

		dispatch(deleteComment(id));
		setIsLoading(false);
	};

	const onCommentDelete = () => {
		dispatch(
			openModal({
				isModalOpen: true,
				text: 'Вы действительно хотите удалить этот комментарий?',
				confirm: commentDelete,
				cancel: null,
			}),
		);
	};

	return (
		<li className="container-comment-item">
			<div className="border-comment-item">
				<div className="comment-header">
					<div className="comment-author">
						<Icon iconCode="fa-user-circle-o" margin="0 10px 0 0" />
						<span>{author}</span>
					</div>
					<div className="comment-published-at">
						<Icon iconCode="fa-calendar" margin="0 10px 0 0" />
						<span>{publishedAt}</span>
					</div>
				</div>
				<span>{content}</span>
			</div>{' '}
			{(userRoleId === ROLE.ADMIN || userRoleId === ROLE.MODERATOR) &&
				(isLoading ? (
					<Loader margin="5px 0 0 10px" />
				) : (
					<Icon
						iconCode="fa-trash-o"
						margin="5px 0 0 10px"
						onClick={onCommentDelete}
					/>
				))}
		</li>
	);
};
