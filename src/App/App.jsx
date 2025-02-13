import { Header, Footer } from '../components';
import { Routes, Route } from 'react-router-dom';
import './App.css';

export const App = () => {
	return (
		<div className="container">
			<Header />
			<Routes>
				<Route path="/" element={<div>MainPage</div>} />
				<Route path="/post/:post_id" element={<div>Post_id</div>} />
				<Route path="/post" element={<div>NewPost</div>} />
				<Route path="/login" element={<div>Login</div>} />
				<Route path="/register" element={<div>Register</div>} />
				<Route path="/users" element={<div>Users</div>} />
				<Route path="*" element={<div>NotFound</div>} />
			</Routes>
			<Footer />
		</div>
	);
};
