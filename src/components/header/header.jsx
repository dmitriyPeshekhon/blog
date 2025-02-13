import { Icon } from '../';
import './header.css';

export const Header = () => {
	return (
		<div className="header-container">
			<div className="logo-container">
				<Icon iconCode="fa-code" size="90px" />
				<div className="logo-text-container">
					<div className="logo-big-text">Блог</div>
					<div className="logo-small-text">веб-разработчика</div>
				</div>
			</div>
		</div>
	);
};
