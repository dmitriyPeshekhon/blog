import { ACTION_TYPES } from './action-types';

export const setPage = (page) => ({
	type: ACTION_TYPES.SET_PAGE,
	payload: page,
});
