export const Icon = ({ iconCode, size = '24px', margin, disabled, ...props }) => {
	return (
		<div
			{...props}
			style={{
				width: size,
				height: size,
				margin: margin,
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<i
				className={`fa ${iconCode}`}
				style={{
					fontSize: size,
					color: disabled ? '#ccc' : '#000',
				}}
			/>
		</div>
	);
};
