import { postTransform } from '../transformers';

export const getPosts = (page, limit, searchPhrase) => {
	const searchUrl = searchPhrase === '' ? '' : `&title_like=${searchPhrase}`;
	const paginateUrl = `?_page=${searchPhrase === '' ? page : 1}&_limit=${limit}`;

	return fetch(`http://localhost:3000/posts${paginateUrl + searchUrl}`)
		.then((res) => Promise.all([res.json(), res.headers.get('Link')]))
		.then(([posts, links]) => ({
			posts: posts.map((post) => postTransform(post)),
			links,
		}))
		.catch(() => null);
};
