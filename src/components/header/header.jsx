import { Icon } from '..';
import { ControlPanel } from './components';
import { Link } from 'react-router-dom';
import './header.css';

export const Header = () => {
	return (
		<div className="header-container">
			<Link className="logo-container" to="/">
				<Icon iconCode="fa-code" size="80px" />
				<div className="logo-text-container">
					<div className="logo-big-text">Блог</div>
					<div className="logo-small-text">веб-разработчика</div>
				</div>
			</Link>
			<div className="center-text">
				Веб-технологии
				<br />
				Написание кода
				<br />
				Разбор ошибок
			</div>
			<ControlPanel />
		</div>
	);
};
