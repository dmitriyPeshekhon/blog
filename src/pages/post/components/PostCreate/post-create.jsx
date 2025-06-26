import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../../../../redux/actions';
import { useState, useRef } from 'react';
import { selectUserSession } from '../../../../redux/selectors';
import { server } from '../../../../bff/bff';
import { errorMessage } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { sanitizeContentPost } from '../../utils';
import { Button, Input, Loader } from '../../../../components';
import './post-create.css';

export const PostCreate = () => {
	const userSession = useSelector(selectUserSession);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [titlePost, setTitlePost] = useState('');
	const [imgPost, setImgPost] = useState('');
	const [isLoadingSave, setIsLoadingSave] = useState(false);

	const contentRef = useRef(null);

	const onChangeTitle = ({ target }) => {
		setTitlePost(target.value);
	};
	const onChangeImg = ({ target }) => {
		setImgPost(target.value);
	};

	const onCreatePost = async () => {
		if (!contentRef.current.innerHTML) {
			return;
		}

		setIsLoadingSave(true);

		const newPostParams = {
			title: titlePost,
			imageUrl: imgPost,
			content: sanitizeContentPost(contentRef.current.innerHTML),
		};

		const createPostRes = await server.addPost(userSession.id, newPostParams);

		if (createPostRes.error) {
			errorMessage(createPostRes.error, dispatch);
			setIsLoadingSave(false);
			return;
		}

		dispatch(setPost(createPostRes.response));
		navigate(`/post/${createPostRes.response.id}`, { replace: true });
	};

	return (
		<>
			<div className="save-panel-post-create">
				{isLoadingSave ? (
					<Loader height="40" margin="0 95px 0" />
				) : (
					<Button
						className="save-post-create-btn"
						width="230px"
						onClick={onCreatePost}
						disabled={!titlePost || !imgPost}
					>
						Добавить новый пост
					</Button>
				)}
			</div>

			<Input
				value={titlePost}
				type="text"
				placeholder="Название статьи..."
				onChange={onChangeTitle}
				margin="0 0 15px 0"
			/>
			<Input
				value={imgPost}
				type="url"
				placeholder="Ссылка на картинку..."
				onChange={onChangeImg}
			/>

			<h3>Текст статьи:</h3>
			<div
				ref={contentRef}
				className="editable-content-post-create"
				contentEditable={true}
				suppressContentEditableWarning={true}
			></div>
		</>
	);
};
