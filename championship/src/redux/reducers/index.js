import { combineReducers } from 'redux';

import championships from './championshipReducer';

const rootReducer = combineReducers({
	championships
});

export default rootReducer;
