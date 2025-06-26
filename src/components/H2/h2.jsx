export const H2 = ({ children, margin = '0', ...props }) => {
	return (
		<h2 {...props} style={{ margin: margin }}>
			{children}
		</h2>
	);
};
