import { server } from '../../bff/bff';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions';
import { Input, InputError, Button } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';

const REGEXP_LOGIN = /^\w+$/;
const REGEXP_PASSWORD = /^[\w#%]+$/;

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Логин не может быть пустым')
		.min(5, 'Логин должен состоять минимум из 5 символов')
		.max(15, 'Логин должен состоять максимум из 15 символов')
		.matches(REGEXP_LOGIN, 'Логин может содержать только буквы и цифры'),
	password: yup
		.string()
		.required('Пароль не может быть пустым')
		.min(7, 'Пароль должен состоять минимум из 7 символов')
		.max(20, 'Пароль должен состоять максимум из 20 символов')
		.matches(
			REGEXP_PASSWORD,
			'Пароль может содержать только буквы, цифры и знаки # %',
		),
});

export const Login = () => {
	const [loginError, setLoginError] = useState('Неправильно введен логин или пароль');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(authFormSchema),
	});

	const onInputChange = () => {
		if (loginError) {
			setLoginError(null);
		}
	};

	const onSubmitForm = async ({ login, password }) => {
		const res = await server.authorize(login, password);
		if (res.error) {
			setLoginError(res.error);
		} else if (res.userData) {
			dispatch(setUser(res.userData));
			navigate('/', { replace: true });
		}
	};
	return (
		<div className="container-login">
			<h2>Авторизация</h2>

			<form className="form-login" onSubmit={handleSubmit(onSubmitForm)}>
				<Input
					className="input-login"
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: onInputChange })}
				/>
				<InputError margin="5px 0">{errors?.login?.message}</InputError>

				<Input
					className="input-login"
					type="text"
					placeholder="Пароль..."
					{...register('password', { onChange: onInputChange })}
				/>
				<InputError margin="5px 0 0">{errors?.password?.message}</InputError>

				<Button type="submit">Авторизоваться</Button>

				{loginError && <p className="error-login-register">{loginError}</p>}

				<Link className="link-to-register" to="/register">
					Регистрация
				</Link>
			</form>
		</div>
	);
};
