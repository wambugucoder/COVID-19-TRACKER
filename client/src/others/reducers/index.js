import { combineReducers } from 'redux';
import covidReducer from './covidReducer';

const rootReducer = combineReducers({
  covid:covidReducer
});

export default rootReducer