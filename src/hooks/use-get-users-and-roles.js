import { useState, useEffect } from 'react';
import { ERRORS, ROLE } from '../constants';
import { server } from '../bff/bff';
import { useSelector } from 'react-redux';
import { selectUserRole, selectUserSession } from '../redux/selectors';

export const useGetUsersAndRoles = () => {
	const [users, setUsers] = useState([]);
	const [errorUsers, setErrorUsers] = useState(null);
	const [roles, setRoles] = useState([]);
	const [errorRoles, setErrorRoles] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { id: authUserSessionId } = useSelector(selectUserSession);
	const userRole = useSelector(selectUserRole);

	const handleFetch = ([usersData, rolesData]) => {
		if (usersData.status === 'rejected' || usersData.value.error) {
			setErrorUsers(usersData.value.error || 'Не удалось получить пользователей');
			return;
		}

		if (rolesData.status === 'rejected' || rolesData.value.error) {
			setErrorRoles(true);
			setUsers(usersData.value.response);
			return;
		}

		setUsers(usersData.value.response);
		setRoles(rolesData.value.response);
	};

	useEffect(() => {
		if (userRole !== ROLE.ADMIN) {
			setIsLoading(false);
			setErrorUsers(ERRORS.ACCESS_PAGE_DENIED);
			return;
		}

		Promise.allSettled([
			server.fetchUsers(authUserSessionId),
			server.fetchRoles(authUserSessionId),
		])
			.then((res) => {
				handleFetch(res);
			})
			.finally(() => setIsLoading(false));
	}, [userRole, authUserSessionId]);

	return {
		users,
		authUserSessionId,
		setUsers,
		errorUsers,
		isLoading,
		roles,
		errorRoles,
	};
};
