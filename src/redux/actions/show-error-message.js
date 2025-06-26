import { ACTION_TYPES } from './action-types';

export const showErrorMessage = (text) => ({
	type: ACTION_TYPES.SHOW_ERROR_MESSAGE,
	payload: text,
});
