import { useState } from 'react';
import { Icon, Loader } from '../../../components';
import { server } from '../../../bff/bff';
import { errorMessage } from '../../../hooks';
import { useDispatch } from 'react-redux';

export const UserItem = ({
	userId,
	login,
	roleId,
	registerAt,
	roles,
	errorRoles,
	authUserSessionId,
	setUsers,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(roleId);
	const [selectedRoleId, setSelectedRoleId] = useState(initialRoleId);
	const [isLoadingEditUser, setIsLoadingEditUser] = useState(false);
	const [isLoadingDeleteUser, setIsLoadingDeleteUser] = useState(false);

	const dispatch = useDispatch();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onSaveUserRole = async () => {
		if (isLoadingDeleteUser || initialRoleId === selectedRoleId) {
			return;
		}
		setIsLoadingEditUser(true);
		const resEdit = await server.setUserRole(
			authUserSessionId,
			userId,
			selectedRoleId,
		);
		if (resEdit.error) {
			errorMessage(resEdit.error, dispatch);
			setIsLoadingEditUser(false);
			return;
		}
		setInitialRoleId(selectedRoleId);
		setIsLoadingEditUser(false);
	};

	const onDeleteUser = async () => {
		if (isLoadingEditUser) {
			return;
		}
		setIsLoadingDeleteUser(true);
		const resDelete = await server.deleteUser(authUserSessionId, userId);
		if (resDelete.error) {
			errorMessage(resDelete.error, dispatch);
			setIsLoadingDeleteUser(false);
			return;
		}
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
		setIsLoadingDeleteUser(false);
	};

	return (
		<li className="user-item">
			<div className="container-user-item">
				<span className="login-table-column">{login}</span>
				<span className="register-at-table-column">{registerAt}</span>
				{errorRoles ? (
					<span className="login-table-column"> Не удалось загрузить роли</span>
				) : (
					<div className="role-table-column  role-table-column-flex">
						<select
							value={selectedRoleId}
							onChange={onRoleChange}
							disabled={isLoadingEditUser || isLoadingDeleteUser}
						>
							{roles.map(({ id, name }) => (
								<option key={id} value={id}>
									{name}
								</option>
							))}
						</select>
						{isLoadingEditUser ? (
							<Loader margin="0 0 0 10px" />
						) : (
							<Icon
								onClick={onSaveUserRole}
								iconCode="fa-floppy-o"
								margin="0 0 0 10px"
								disabled={
									initialRoleId === selectedRoleId ||
									isLoadingDeleteUser
								}
							/>
						)}
					</div>
				)}
			</div>
			{isLoadingDeleteUser ? (
				<Loader margin="0 0 0 10px" />
			) : (
				<Icon
					onClick={onDeleteUser}
					iconCode="fa-trash-o"
					margin="0 0 0 10px"
					disabled={isLoadingEditUser}
				/>
			)}
		</li>
	);
};
