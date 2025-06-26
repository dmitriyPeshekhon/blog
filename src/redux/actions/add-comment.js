import { ACTION_TYPES } from './action-types';

export const addComment = (comment) => ({
	type: ACTION_TYPES.ADD_COMMENT,
	payload: comment,
});
