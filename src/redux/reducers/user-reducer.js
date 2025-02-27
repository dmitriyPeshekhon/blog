import { ROLE } from '../../constants';

const initialState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'RESET_USER': {
			return { ...state, ...payload };
		}
		default:
			return state;
	}
};
