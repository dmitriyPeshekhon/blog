import { ACTION_TYPES } from '../actions';

export const initialPost = {
	id: null,
	title: '',
	content: '',
	imageUrl: '',
	publishedAt: null,
	comments: [],
};

export const postReducer = (state = initialPost, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPES.SET_POST:
			return { ...state, ...payload };
		case ACTION_TYPES.DELETE_POST:
			return initialPost;
		case ACTION_TYPES.ADD_COMMENT:
			return { ...state, comments: [...state.comments, payload] };
		case ACTION_TYPES.DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter((comment) => comment.id !== payload),
			};
		default:
			return state;
	}
};
