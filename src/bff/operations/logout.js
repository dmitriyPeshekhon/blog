import { session } from '../sessions';

export const logout = (hashId) => {
	return session.remove(hashId);
};
