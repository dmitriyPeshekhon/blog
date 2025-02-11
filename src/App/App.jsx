import './App.css';
import { server } from '../bff/bff';

const onClick = () => {
	server.registration('test1', 'test');
};

export const App = () => {
	return (
		<div>
			<h1>test</h1>
			<button onClick={onClick}>test</button>
		</div>
	);
};
