import { useParams, useMatch } from 'react-router-dom';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { server } from '../../bff/bff';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, setPost } from '../../redux/actions';
import { selectUserRole } from '../../redux/selectors';
import { Content } from '../../components';
import { ERRORS, ROLE } from '../../constants';
import { PostContent, PostComments, PostEdit, PostCreate } from './components';

export const Post = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingComments, setIsLoadingComments] = useState(true);
	const [isError, setIsError] = useState(null);
	const [isErrorComments, setIsErrorComments] = useState(null);

	const params = useParams();
	const dispatch = useDispatch();

	const userRole = useSelector(selectUserRole);

	const isEditing = useMatch('/post/:post_id/edit');
	const isCreating = useMatch({ path: '/post', end: true });

	const handleGetPostAndComments = useCallback(async (postId) => {
		setIsLoading(true);

		const resPost = await server.fetchPost(postId);

		if (resPost.error) {
			setIsError(resPost.error);
			setIsLoading(false);
			setIsLoadingComments(false);
			return;
		}

		setIsLoading(false);

		const resComments = await server.fetchComments(postId);

		if (resComments.error) {
			setIsErrorComments(resComments.error);
			dispatch(setPost(resPost.response));
			setIsLoading(false);
			setIsLoadingComments(false);
			return;
		}
		dispatch(setPost({ ...resPost.response, comments: resComments.response }));

		setIsLoadingComments(false);
	}, []);

	useLayoutEffect(() => {
		dispatch(deletePost);
	}, []);

	useEffect(() => {
		if ((isCreating || isEditing) && ROLE.ADMIN !== userRole) {
			setIsError(ERRORS.ACCESS_PAGE_DENIED);
			return;
		}

		if (isCreating) {
			return;
		}

		handleGetPostAndComments(params.post_id);
	}, [userRole, params.post_id]);

	const content = () => {
		if (isEditing) {
			return <PostEdit isEditing={isEditing} isCreating={isCreating} />;
		}

		if (isCreating) {
			return <PostCreate />;
		}

		return (
			<>
				<PostContent />
				<PostComments
					isLoading={isLoadingComments}
					isError={isErrorComments}
					postId={params.post_id}
				/>
			</>
		);
	};

	return (
		<Content errorMessage={isError} isLoading={isLoading} margin="20px 0 0">
			{content()}
		</Content>
	);
};
