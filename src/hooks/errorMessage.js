import { showErrorMessage, hideErrorMessage } from '../redux/actions';

export const errorMessage = (text, dispatch) => {
	dispatch(showErrorMessage(text));

	setTimeout(() => dispatch(hideErrorMessage), 2000);
};
