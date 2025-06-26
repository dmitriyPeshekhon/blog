import { useDispatch } from 'react-redux';
import { Button } from '../../../../components';
import { toBeginning, prevPage, nextPage, setPage } from '../../../../redux/actions';
import './pagination.css';

export const Pagination = ({ page, lastPage }) => {
	const dispatch = useDispatch();
	return (
		<div className="pagination">
			<Button
				className="pagination-buttons"
				disabled={page === 1}
				onClick={() => dispatch(toBeginning())}
			>
				В начало
			</Button>
			<Button
				className="pagination-buttons"
				disabled={page === 1}
				onClick={() => dispatch(prevPage())}
			>
				{'<'}
			</Button>
			<div className="pagination-current-page">{page}</div>
			<Button
				className="pagination-buttons"
				disabled={page === lastPage}
				onClick={() => dispatch(nextPage())}
			>
				{'>'}
			</Button>
			<Button
				className="pagination-buttons"
				disabled={page === lastPage}
				onClick={() => dispatch(setPage(lastPage))}
			>
				{lastPage}
			</Button>
		</div>
	);
};
