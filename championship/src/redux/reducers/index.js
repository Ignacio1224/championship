import { combineReducers } from 'redux';
import championshipReducer from './championshipReducer';
import userReducer from './userReducer';
import teamReducer from './teamReducer';


const rootReducer = combineReducers({
	championshipReducer,
	userReducer,
	teamReducer
});

export default rootReducer;
