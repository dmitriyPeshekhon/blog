import { useGetUsersAndRoles } from '../../hooks';
import { Content, H2 } from '../../components';
import { UserItem } from './components';
import { ROLE } from '../../constants';
import './users.css';

export const Users = () => {
	const {
		authUserSessionId,
		users,
		setUsers,
		errorUsers,
		isLoading,
		roles,
		errorRoles,
	} = useGetUsersAndRoles();

	const rolesWithoutGuest = roles.filter((role) => role.id !== ROLE.GUEST);

	return (
		<Content errorMessage={errorUsers} isLoading={isLoading} margin="50px auto">
			<H2 className="title-users" margin="0 0 30px 0">
				Пользователи
			</H2>
			<div className="table-header">
				<span className="login-table-column margin-left">Логин</span>
				<span className="register-at-table-column">Дата регистрации</span>
				<span className="role-table-column">Роль</span>
			</div>
			<ul className="list-users">
				{users.map(({ id, login, registerAt, roleId }) => (
					<UserItem
						key={id}
						userId={id}
						login={login}
						registerAt={registerAt}
						roleId={roleId}
						errorRoles={errorRoles}
						roles={rolesWithoutGuest}
						authUserSessionId={authUserSessionId}
						setUsers={setUsers}
					/>
				))}
			</ul>
		</Content>
	);
};
