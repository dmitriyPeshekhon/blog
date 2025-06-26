export const ROLE = {
	ADMIN: 0,
	MODERATOR: 1,
	READER: 2,
	GUEST: 3,
};

export const getRolesArray = () => Object.keys(ROLE).map((role) => role.toLowerCase());
