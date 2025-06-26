export const Button = ({
	children,
	width = '100%',
	padding = '0',
	margin = '0',
	disabled,
	...props
}) => {
	return (
		<button
			disabled={disabled}
			{...props}
			style={{
				height: '40px',
				width: width,
				margin: margin,
				padding: padding,
				fontSize: '18px',
				cursor: disabled ? 'default' : 'pointer',
			}}
		>
			{children}
		</button>
	);
};
