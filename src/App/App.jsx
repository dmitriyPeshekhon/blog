import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import { Header, Footer, Modal, Content } from '../components';
import { ERRORS } from '../constants';
import { Authorization, Registration, Main, Users, Post } from '../pages';
import { Routes, Route } from 'react-router-dom';
import { selectErrorMessage } from '../redux/selectors';
import { useLayoutEffect } from 'react';
import './App.css';

export const App = () => {
	const [isloadingUser, setIsLoadingUser] = useState(true);

	const dispatch = useDispatch();
	const errorMessage = useSelector(selectErrorMessage);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			setIsLoadingUser(false);
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
		setIsLoadingUser(false);
	}, []);

	return (
		<div className="container">
			<Header />
			<main className="main">
				{!isloadingUser && (
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/post/:post_id" element={<Post />} />
						<Route path="/post/:post_id/edit" element={<Post />} />
						<Route path="/post" element={<Post />} />
						<Route path="/authorization" element={<Authorization />} />
						<Route path="/registration" element={<Registration />} />
						<Route path="/users" element={<Users />} />
						<Route
							path="*"
							element={<Content errorMessage={ERRORS.PAGE_NOT_FOUND} />}
						/>
					</Routes>
				)}
			</main>
			<Footer />
			{errorMessage ? (
				<div className="container-error-message">{`Ошибка: ${errorMessage}`}</div>
			) : null}
			{errorMessage && (
				<div className="container-error-message">{`Ошибка: ${errorMessage}`}</div>
			)}
			<Modal />
		</div>
	);
};
