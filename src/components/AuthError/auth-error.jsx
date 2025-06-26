export const AuthError = ({ children }) => {
	return (
		<p
			style={{
				fontSize: '16px',
				textAlign: 'center',
				color: 'red',
				marginBottom: '0',
			}}
		>
			{children}
		</p>
	);
};
