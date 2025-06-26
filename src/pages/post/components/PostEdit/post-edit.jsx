import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { selectPost, selectUserSession } from '../../../../redux/selectors';
import { setPost } from '../../../../redux/actions';
import { server } from '../../../../bff/bff';
import { errorMessage } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { sanitizeContentPost } from '../../utils';
import { Icon, Input, Loader } from '../../../../components';
import { SpecialPannel } from '../SpecialPannel/special-pannel';
import './post-edit.css';

export const PostEdit = () => {
	const post = useSelector(selectPost);
	const userSession = useSelector(selectUserSession);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [titlePost, setTitlePost] = useState(post.title);
	const [imgPost, setImgPost] = useState(post.imageUrl);
	const [isLoadingSave, setIsLoadingSave] = useState(false);

	const contentRef = useRef(null);

	const onChangeTitle = ({ target }) => {
		setTitlePost(target.value);
	};
	const onChangeImg = ({ target }) => {
		setImgPost(target.value);
	};

	const onSavePost = async () => {
		setIsLoadingSave(true);

		const newPostParams = {
			id: post.id,
			title: titlePost,
			imageUrl: imgPost,
			content: sanitizeContentPost(contentRef.current.innerHTML),
		};
		const setPostStatus = await server.setPost(userSession.id, newPostParams);

		if (setPostStatus.error) {
			errorMessage(setPostStatus.error, dispatch);
			setIsLoadingSave(false);
			return;
		}
		dispatch(setPost({ ...post, ...newPostParams }));
		navigate(`/post/${post.id}`, { replace: true });
	};

	return (
		<>
			<SpecialPannel
				postId={post.id}
				isLoading={isLoadingSave}
				publishedAt={post.publishedAt}
				renderButton={
					isLoadingSave ? (
						<Loader />
					) : (
						<Icon iconCode="fa-floppy-o" onClick={onSavePost} />
					)
				}
			/>

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
				margin="0 0 25px 0"
			/>

			<div
				ref={contentRef}
				className="editable-content-post"
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{post.content}
			</div>
		</>
	);
};
