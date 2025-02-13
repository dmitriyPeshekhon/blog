export const Icon = ({ iconCode, size }) => {
	console.log(`fa ${iconCode}`);
	return <i className={`fa ${iconCode}`} style={{ fontSize: size }} />;
};
