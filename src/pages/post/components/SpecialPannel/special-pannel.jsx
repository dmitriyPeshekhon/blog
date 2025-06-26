import { useState } from 'react';
import { Icon, Loader } from '../../../../components';
import { server } from '../../../../bff/bff';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserSession } from '../../../../redux/selectors';
import { deletePost, openModal } from '../../../../redux/actions';
import { errorMessage } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import './special-pannel.css';

export const SpecialPannel = ({
	postId,
	publishedAt,
	showButtons = true,
	isLoading,
	renderButton,
}) => {
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userSession = useSelector(selectUserSession);

	const handleDeletePost = async () => {
		setIsLoadingDelete(true);
		const statusDeletePost = await server.deletePost(userSession.id, postId);

		if (statusDeletePost.error) {
			errorMessage(statusDeletePost.error, dispatch);
			setIsLoadingDelete(false);
			return;
		}
		dispatch(deletePost);
		navigate('/', { replace: true });
	};

	const onDeletePost = () => {
		dispatch(
			openModal({
				isModalOpen: true,
				text: 'Вы действительно хотите удалить этот пост?',
				confirm: handleDeletePost,
			}),
		);
	};
	return (
		<div className="post-special-pannel">
			<div className="created-at-special-pannel">
				<Icon iconCode="fa-calendar" />
				<span>{publishedAt}</span>
			</div>
			{showButtons && (
				<div className="buttons-special-pannel">
					{isLoading || isLoadingDelete ? (
						<Loader />
					) : (
						<>
							{renderButton}
							<Icon
								iconCode="fa-trash-o"
								margin="0 0 0 15px"
								onClick={onDeletePost}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
};
