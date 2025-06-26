export const userTransform = ({ id, login, register_at, role_id }) => ({
	id,
	login,
	registerAt: register_at,
	roleId: role_id,
});
