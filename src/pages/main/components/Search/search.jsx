import { Input, Icon } from '../../../../components';
import './search.css';

export const Search = ({ searchPhrase, onChange, onClear }) => {
	return (
		<div className="container-search">
			<Input
				value={searchPhrase}
				onChange={onChange}
				placeholder="Поиск по названию..."
				padding={searchPhrase === '' ? '10px' : '10px 37px 10px 10px'}
			/>
			{searchPhrase !== '' && <Icon iconCode="fa-times" onClick={onClear} />}
		</div>
	);
};
