import { combineReducers } from 'redux';
import specsReducer from './specsReducer';

export default combineReducers({
 specs: specsReducer
});
