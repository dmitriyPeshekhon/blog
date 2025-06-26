import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/actions';
import { selectModal } from '../../redux/selectors';
import { Button } from '../Button/button';
import { H2 } from '../H2/h2';
import './Modal.css';

export const Modal = () => {
	const { isModalOpen, text, confirm, cancel } = useSelector(selectModal);

	const dispatch = useDispatch();

	if (!isModalOpen) {
		return null;
	}

	const handleClick = (action) => {
		if (action) {
			action();
		}
		dispatch(closeModal);
	};

	return (
		<div className="modal-overlay">
			<div className="modal-window">
				<H2>{text}</H2>
				<Button margin="10px 0 10px 0" onClick={() => handleClick(confirm)}>
					Подтердить
				</Button>
				<Button onClick={() => handleClick(cancel)}>Отмена</Button>
			</div>
		</div>
	);
};
