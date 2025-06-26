import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const StyledLoader = styled.span`
	width: ${({ height }) => height}px;
	height: ${({ height }) => height}px;
	border: ${({ height }) => Number(height) / 10}px solid #000;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: ${rotation} 1s linear infinite;
`;

const LoaderStyled = ({ height }) => <StyledLoader height={height} />;

export const Loader = ({ height = '24', margin = '0' }) => {
	return (
		<div style={{ margin: margin, width: `${height}px`, height: `${height}px` }}>
			<LoaderStyled height={height} />
		</div>
	);
};
