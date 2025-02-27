import { Input, InputError, Button } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import './login.css';

const REGEXP_LOGIN = /^\w+$/;
const REGEXP_PASSWORD = /^[\w#%]+$/;

export const Login = () => {
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(authFormSchema),
	});

	const onSubmitForm = ({ login, password }) => {
		console.log(login, password);
	};
	return (
		<div className="container-login">
			<h2>Авторизация</h2>

			<form className="form-login" onSubmit={handleSubmit(onSubmitForm)}>
				<Input
					className="input-login"
					type="text"
					placeholder="Логин..."
					{...register('login')}
				/>
				<InputError margin="5px 0">{errors?.login?.message}</InputError>

				<Input
					className="input-login"
					type="text"
					placeholder="Пароль..."
					{...register('password')}
				/>
				<InputError margin="5px 0 0">{errors?.password?.message}</InputError>

				<Button type="submit">Авторизоваться</Button>

				<Link className="link-to-register" to="/register">
					Регистрация
				</Link>
			</form>
		</div>
	);
};
