import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectComments } from '../../../../redux/selectors';
import { addComment } from '../../../../redux/actions';
import { ROLE } from '../../../../constants';
import { errorMessage } from '../../../../hooks';
import { Icon, Loader, Content } from '../../../../components';
import { CommentItem } from './components';
import { server } from '../../../../bff/bff';
import './post-comments.css';

export const PostComments = ({ isLoading, isError, postId }) => {
	const [newComment, setNewComment] = useState('');
	const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);

	const { id: userId, login: userName, session, roleId } = useSelector(selectUser);
	const comments = useSelector(selectComments);

	const dispatch = useDispatch();

	const onCommentAdd = async () => {
		setIsLoadingAddComment(true);

		const addCommentRes = await server.addComment(session.id, {
			userId,
			postId,
			content: newComment,
		});

		if (addCommentRes.error) {
			errorMessage(addCommentRes.error, dispatch);
			setIsLoadingAddComment(false);
			return;
		}

		dispatch(addComment({ ...addCommentRes.response, author: userName }));
		setNewComment('');
		setIsLoadingAddComment(false);
	};

	const onChangeComment = ({ target }) => {
		setNewComment(target.value);
	};

	return (
		<Content errorMessage={isError} isLoading={isLoading}>
			<div className="comments-post">
				{roleId !== ROLE.GUEST && (
					<div className="container-new-comment">
						<textarea
							value={newComment}
							placeholder="Комментарий..."
							onChange={onChangeComment}
						/>
						{isLoadingAddComment ? (
							<Loader margin="5px 0 0 10px" />
						) : (
							<Icon
								iconCode="fa-paper-plane"
								margin="5px 0 0 10px"
								onClick={onCommentAdd}
							/>
						)}
					</div>
				)}
				<ul className="list-comments">
					{comments.map(({ id, author, content, publishedAt }) => (
						<CommentItem
							key={id}
							id={id}
							author={author}
							content={content}
							publishedAt={publishedAt}
							userSession={session.id}
							userRoleId={roleId}
						/>
					))}
				</ul>
			</div>
		</Content>
	);
};
