import { server } from '../../bff/bff';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';
import { selectUserRole } from '../../redux/selectors';
import { ContainerAuthLayout } from '../../layouts';
import { H2, Input, InputError, Button, AuthError } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { REGEXP, ROLE } from '../../constants';
import './registration.css';

const registrationFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Логин не может быть пустым')
		.min(5, 'Логин должен состоять минимум из 5 символов')
		.max(15, 'Логин должен состоять максимум из 15 символов')
		.matches(REGEXP.LOGIN, 'Логин может содержать только буквы и цифры'),
	password: yup
		.string()
		.required('Пароль не может быть пустым')
		.min(7, 'Пароль должен состоять минимум из 7 символов')
		.max(20, 'Пароль должен состоять максимум из 20 символов')
		.matches(
			REGEXP.PASSWORD,
			'Пароль может содержать только буквы, цифры и знаки # %',
		),
	confirmPassword: yup
		.string()
		.required('Необходимо повторить пароль')
		.oneOf([yup.ref('password'), ''], 'Пароли должны совпадать'),
});

export const Registration = () => {
	const [registerError, setRegisterError] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userRoleId = useSelector(selectUserRole);

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(registrationFormSchema),
	});

	const onInputChange = () => {
		if (registerError) {
			setRegisterError(null);
		}
	};

	const onSubmitForm = async ({ login, password }) => {
		const res = await server.registration(login, password);
		if (res.error) {
			setRegisterError(res.error);
		} else if (res.response) {
			dispatch(setUser(res.response));
			sessionStorage.setItem('userData', JSON.stringify(res.response));
			navigate('/', { replace: true });
		}
	};

	if (userRoleId !== ROLE.GUEST) {
		return <Navigate to="/" replace={true} />;
	}

	return (
		<ContainerAuthLayout>
			<H2>Регистрация</H2>

			<form className="form-auth" onSubmit={handleSubmit(onSubmitForm)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: onInputChange })}
				/>
				<InputError margin="5px 0">{errors?.login?.message}</InputError>

				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: onInputChange })}
				/>
				<InputError margin="5px 0">{errors?.password?.message}</InputError>

				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('confirmPassword', { onChange: onInputChange })}
				/>
				<InputError margin="5px 0 0">
					{errors?.confirmPassword?.message}
				</InputError>

				<Button
					type="submit"
					disabled={
						!getValues('login') ||
						!getValues('password') ||
						!getValues('confirmPassword') ||
						registerError ||
						Object.keys(errors)[0]
					}
				>
					Зарегистрироваться
				</Button>

				{registerError && <AuthError>{registerError}</AuthError>}

				<Link className="link-to-reg-auth" to="/authorisation">
					Авторизация
				</Link>
			</form>
		</ContainerAuthLayout>
	);
};
