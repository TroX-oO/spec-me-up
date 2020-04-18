import { combineReducers } from 'redux';
import specsReducer from './specsReducer';
import fixmesReducer from './fixmesReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  specs: specsReducer,
  comments: commentsReducer,
  fixmes: fixmesReducer
});
