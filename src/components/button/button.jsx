export const Button = ({ children, width = '100%', ...props }) => {
	return (
		<button {...props} style={{ height: '40px', width: width, fontSize: '18px' }}>
			{children}
		</button>
	);
};
