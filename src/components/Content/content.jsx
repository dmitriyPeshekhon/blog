import { H2 } from '../H2/h2';
import { Loader } from '../Loader/loader';
import './content.css';

export const Content = ({ errorMessage, isLoading = false, margin = '0', children }) => {
	return (
		<div style={{ margin: margin }}>
			{errorMessage ? (
				<H2 className="title-error">{errorMessage}</H2>
			) : isLoading ? (
				<Loader height="100" margin="100px auto 0" />
			) : (
				children
			)}
		</div>
	);
};
