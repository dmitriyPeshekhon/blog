import { ROLE } from '../../constants';
import { ACTION_TYPES } from '../actions';

const initialUser = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	registerAt: null,
	session: {
		id: null,
		hash: null,
	},
};

export const userReducer = (state = initialUser, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPES.SET_USER:
			return { ...state, ...payload };
		case ACTION_TYPES.LOGOUT:
			return initialUser;
		default:
			return state;
	}
};
