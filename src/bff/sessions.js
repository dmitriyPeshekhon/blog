import { createSession, deleteSession, getSession, getUserById } from './api';

export const session = {
	async create(userId) {
		const hash = Math.random().toFixed(50);

		const createdSession = await createSession(hash, userId);

		if (!createdSession) {
			return {
				error: 'Ошибка создания сессии',
				session: null,
			};
		}

		return {
			error: null,
			session: createdSession,
		};
	},
	async remove(hashId) {
		const statusDeleteSession = await deleteSession(hashId);

		if (!statusDeleteSession) {
			return {
				error: 'Ошибка удаления сессии',
			};
		}

		return {
			error: null,
		};
	},
	async access(hashId, accessRoles) {
		const session = await getSession(hashId);

		if (!session) {
			return {
				error: 'Не удалось получить права для выполнения операции',
				access: null,
			};
		}

		const user = await getUserById(session.userId);

		if (!user) {
			return {
				error: 'Не удалось получить права для выполнения операции',
				access: null,
			};
		}
		if (accessRoles.includes(user.roleId)) {
			return {
				error: null,
				access: true,
			};
		}

		return {
			error: null,
			access: false,
		};
	},
};
