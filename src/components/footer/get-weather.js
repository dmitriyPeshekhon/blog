const API_KEY = '3daa3828b47130a5afca8b8f7963e84c';
const URL_GET_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Moscow&lang=ru&units=metric&appid=${API_KEY}`;

export const getWeather = () => {
	return fetch(URL_GET_WEATHER)
		.then((res) => res.json())
		.catch(() => null);
};
