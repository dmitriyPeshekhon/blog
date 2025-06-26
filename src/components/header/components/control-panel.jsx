import { Link, useNavigate, useMatch } from 'react-router-dom';
import { Icon } from '../../Icon/icon';
import { Button } from '../../Button/button';
import { Loader } from '../../Loader/loader';
import { useState } from 'react';
import { server } from '../../../bff/bff';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage } from '../../../hooks';
import { selectUser } from '../../../redux/selectors';
import { logout } from '../../../redux/actions';
import { ROLE } from '../../../constants';

export const ControlPanel = () => {
	const [isLoadingLogout, setIsLoadingLogout] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const urlMatchData = useMatch('/:type');

	const user = useSelector(selectUser);

	const handleLogoutClick = async () => {
		setIsLoadingLogout(true);
		const res = await server.logout(user.session.id);

		if (res.error) {
			errorMessage(res.error, dispatch);
			setIsLoadingLogout(false);
			return;
		}

		setIsLoadingLogout(false);
		sessionStorage.removeItem('userData');
		dispatch(logout);
	};

	return (
		<div className="control-panel">
			<div className="top-panel">
				{user.roleId === ROLE.GUEST ? (
					<Button width="30%">
						{urlMatchData?.params.type === 'authorization' ? (
							<span>Войти</span>
						) : (
							<Link className="link-in-btn-logout" to="/authorization">
								Войти
							</Link>
						)}
					</Button>
				) : (
					<>
						<span className="user-name">{user.login}</span>
						{isLoadingLogout ? (
							<Loader />
						) : (
							<button className="logout-btn" onClick={handleLogoutClick}>
								<Icon iconCode="fa-sign-out" />
							</button>
						)}
					</>
				)}
			</div>
			<div className="down-panel">
				<button className="back-nav-btn" onClick={() => navigate(-1)}>
					<Icon iconCode="fa-reply" />
				</button>
				{user.roleId === ROLE.ADMIN && (
					<>
						<Icon
							iconCode="fa-newspaper-o"
							margin=" 0 15px 0 0"
							onClick={() => navigate('/post')}
						/>
						<Link to="/users">
							<Icon iconCode="fa-users" />
						</Link>
					</>
				)}
			</div>
		</div>
	);
};
