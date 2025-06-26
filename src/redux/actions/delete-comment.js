import { ACTION_TYPES } from './action-types';

export const deleteComment = (id) => ({
	type: ACTION_TYPES.DELETE_COMMENT,
	payload: id,
});
