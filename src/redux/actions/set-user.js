import { ACTION_TYPES } from './';

export const setUser = (user) => ({
	type: ACTION_TYPES.SET_USER,
	payload: user,
});
