import { useEffect, useState } from 'react';
import { getWeather } from './get-weather';
import './footer.css';

export const Footer = () => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		const response = async () => {
			const data = await getWeather();
			if (data) {
				setWeather({
					temp: Math.round(data.main.temp),
					description: data.weather[0].description,
				});
			}
		};
		response();
	}, []);

	return (
		<div className="container-footer">
			<div>
				Блог веб разработчика
				<br />
				web@developer.ru
			</div>
			<div>
				Москва,{' '}
				{new Date().toLocaleString('ru', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				})}
				<br />
				{weather && `${weather.temp} градусов, ${weather.description}`}
			</div>
		</div>
	);
};
