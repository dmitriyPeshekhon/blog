import { ACTION_TYPES } from '../actions/action-types';

const initalMaodal = {
	isModalOpen: false,
	text: null,
	confirm: null,
	cancel: null,
};

export const modalReducer = (state = initalMaodal, action) => {
	switch (action.type) {
		case ACTION_TYPES.OPEN_MODAL:
			return action.payload;
		case ACTION_TYPES.CLOSE_MODAL:
			return initalMaodal;
		default:
			return state;
	}
};
