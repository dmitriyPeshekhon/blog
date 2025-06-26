import { ACTION_TYPES } from '../actions';

const initialPage = {
	page: 1,
	lastPage: 1,
};

export const paginateReducer = (state = initialPage, action) => {
	switch (action.type) {
		case ACTION_TYPES.TO_BEGINNING:
			return { ...state, page: initialPage.page };
		case ACTION_TYPES.PREV_PAGE:
			return { ...state, page: state.page - 1 };
		case ACTION_TYPES.NEXT_PAGE:
			return { ...state, page: state.page + 1 };
		case ACTION_TYPES.SET_PAGE:
			return { ...state, page: action.payload };
		case ACTION_TYPES.SET_LAST_PAGE:
			return { ...state, lastPage: action.payload };
		default:
			return state;
	}
};
