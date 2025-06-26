import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	userReducer,
	postReducer,
	errorsReducer,
	modalReducer,
	paginateReducer,
} from './reducers';

const reducer = combineReducers({
	user: userReducer,
	post: postReducer,
	errors: errorsReducer,
	modal: modalReducer,
	pages: paginateReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
