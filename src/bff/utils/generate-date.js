export const generateDate = () => {
	const nowUtc = new Date();

	const moscowTime = new Date(nowUtc.getTime() + 3 * 60 * 60 * 1000);

	return moscowTime.toISOString().substring(0, 16).replace('T', ' ');
};
