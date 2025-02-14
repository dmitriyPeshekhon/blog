import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../';

export const ControlPanel = () => {
	const navigate = useNavigate();

	return (
		<div className="control-panel">
			<div className="top-panel">
				{/* <span className="user-name">Name</span>
				<Link to="/login">
					<Icon iconCode="fa-sign-out" />
				</Link> */}
				<Link to="/login">
					<button className="header-login-btn">Войти</button>
				</Link>
			</div>
			<div className="down-panel">
				<div onClick={() => navigate(-1)}>
					<Icon iconCode="fa-reply" margin=" 0 15px 0 0" />
				</div>

				<Link to="/post">
					<Icon iconCode="fa-newspaper-o" margin=" 0 15px 0 0" />
				</Link>
				<Link to="/users">
					<Icon iconCode="fa-users" />
				</Link>
			</div>
		</div>
	);
};
