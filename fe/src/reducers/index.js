import {combineReducers} from 'redux';
import { routerStateReducer } from 'redux-router';

/**
 * Creates the main reducer merging all the reducers in the app in a single object
 * @param      {Function} reducers that manage specific parts of the state
 * @return     {Function} that calls reducers with the slices of state selected according to their keys
 */
const rootReducer = combineReducers({
  router: routerStateReducer,
});

export default rootReducer;
