import { ACTION_TYPES } from './action-types';

export const openModal = (modalParams) => ({
	type: ACTION_TYPES.OPEN_MODAL,
	payload: modalParams,
});
