import { ACTION_TYPES } from './action-types';

export const setLastPage = (page) => ({
	type: ACTION_TYPES.SET_LAST_PAGE,
	payload: page,
});
