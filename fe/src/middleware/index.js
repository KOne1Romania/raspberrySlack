import thunk from 'redux-thunk';
import request from './request';
import logger from './logger';

// todo: investigate if we need thunk
/**
 * Creates an Array with all the middleware functions in the app
 * @return {Array} with all middlewares used
 */
export default [
  thunk,
  request,
  logger,
];
