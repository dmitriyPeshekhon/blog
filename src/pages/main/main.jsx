import { useEffect, useState, useMemo } from 'react';
import { Content } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { PostCard, Pagination, Search } from './components';
import { server } from '../../bff/bff';
import { getLastPageInHeaders } from './utils';
import { LIMIT_PAGINATE } from '../../constants';
import { selectPages } from '../../redux/selectors';
import { setLastPage } from '../../redux/actions';
import { debounce } from '../../utils';
import './main.css';

export const Main = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isErrorPosts, setIsErrorPosts] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isSearchingFlag, setIsSearchingFlag] = useState(true);

	const { page, lastPage } = useSelector(selectPages);
	const dispatch = useDispatch();

	useEffect(() => {
		const asyncGetPost = async () => {
			if (!isLoading) {
				setIsLoading(true);
			}

			const respPosts = await server.fetchPosts(page, LIMIT_PAGINATE, searchPhrase);

			if (respPosts.error) {
				setIsErrorPosts(respPosts.error);
				setIsLoading(false);
			}
			setPosts(respPosts.response.posts);
			dispatch(setLastPage(getLastPageInHeaders(respPosts.response.links)));
			setIsLoading(false);
		};

		asyncGetPost();
	}, [page, isSearchingFlag]);

	const debounsedSetSerchFlag = useMemo(() => debounce(setIsSearchingFlag, 2500), []);

	const onChangingSearch = ({ target }) => {
		setSearchPhrase(target.value);

		if (target.value === '') {
			return;
		}

		debounsedSetSerchFlag(!isSearchingFlag);
	};

	const onClearSearch = () => {
		if (searchPhrase === '') {
			return;
		}
		setSearchPhrase('');
		setIsSearchingFlag(!isSearchingFlag);
	};

	return (
		<Content isLoading={isLoading} errorMessage={isErrorPosts}>
			<Search
				searchPhrase={searchPhrase}
				onChange={onChangingSearch}
				onClear={onClearSearch}
			/>
			{searchPhrase !== '' && posts.length === 0 && (
				<div className="search-no-results">Нет результатов...</div>
			)}
			<div className="list-post-card">
				{posts.map(({ id, imageUrl, title, publishedAt, countComments }) => (
					<PostCard
						key={id}
						postId={id}
						imageUrl={imageUrl}
						title={title}
						publishedAt={publishedAt}
						countComments={countComments}
					/>
				))}
			</div>
			{lastPage > 1 && searchPhrase === '' && (
				<Pagination page={page} lastPage={lastPage} />
			)}
		</Content>
	);
};
