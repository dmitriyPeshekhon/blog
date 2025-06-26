export const Input = ({
	width = '100%',
	border = true,
	padding = '10px',
	margin = '0',
	...props
}) => {
	return (
		<input
			{...props}
			style={{
				width: width,
				height: '40px',
				fontSize: '18px',
				padding: padding,
				margin: margin,
				border: border ? 'solid 1px black' : 'none',
				borderRadius: '5px',
			}}
		/>
	);
};
