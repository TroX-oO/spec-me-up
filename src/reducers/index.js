import { combineReducers } from 'redux';
import specsReducer from './specsReducer';
import fixmesReducer from './fixmesReducer';

export default combineReducers({
  specs: specsReducer,
  fixmes: fixmesReducer
});
