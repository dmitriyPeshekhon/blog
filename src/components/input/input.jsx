export const Input = ({ width = '100%', ...props }) => {
	return (
		<input
			{...props}
			style={{
				width: width,
				height: '40px',
				fontSize: '18px',
				padding: '10px',
				border: 'solid 1px black',
				borderRadius: '5px',
			}}
		/>
	);
};
