import { combineReducers } from 'redux';
import championshipReducer from './championshipReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
	championshipReducer,
	userReducer
});

export default rootReducer;
