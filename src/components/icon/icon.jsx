export const Icon = ({ iconCode, size = '24px', margin }) => {
	return (
		<i
			className={`fa ${iconCode}`}
			style={{ fontSize: size, margin: margin, color: '#000' }}
		/>
	);
};
