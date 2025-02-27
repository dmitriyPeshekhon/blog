export const InputError = ({ children, margin }) => {
	return (
		<div
			style={{
				height: '30px',
				color: 'red',
				margin: margin,
				fontSize: '14px',
				lineHeight: '1.1',
			}}
		>
			{children}
		</div>
	);
};
