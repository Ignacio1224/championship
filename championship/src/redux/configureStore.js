import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from './reducers';

export default function configureStore(initialState) {
	const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	return createStore(rootReducer, initialState, composeEnhansers(applyMiddleware(reduxImmutableStateInvariant())));
}
