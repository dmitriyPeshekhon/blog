import { ACTION_TYPES } from '../actions';

const initialErrors = {
	errorMessage: null,
};

export const errorsReducer = (state = initialErrors, action) => {
	switch (action.type) {
		case ACTION_TYPES.SHOW_ERROR_MESSAGE:
			return { errorMessage: action.payload };
		case ACTION_TYPES.HIDE_ERROR_MESSAGE:
			return initialErrors;
		default:
			return state;
	}
};
