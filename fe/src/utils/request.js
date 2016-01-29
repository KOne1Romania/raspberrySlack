require('es6-promise').polyfill();
require('isomorphic-fetch');

export const defaultParams = {
  mode: 'cors',
  headers: {
    'x-access-token': null,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export function addToken(token) {
  defaultParams.headers['x-access-token'] = token;
}
/**
 * HTTP GET
 * @param  {string} url api endpoint
 * @return {Promise}
 */
export function get(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'get',
  });
}

/**
 * HTTP POST
 * @param  {string} url api endpoint
 * @param  {object} body
 * @return {Promise}
 */
export function post(url, body = {}, textContentTypes = false) {
  var headers = {};
  if (textContentTypes) {
    headers['x-access-token'] = defaultParams.headers['x-access-token'];
  }else{
    headers = defaultParams.headers;
  }
  return fetch(url, {
    headers:headers,
    mode: 'cors',
    method: 'post',
    body: textContentTypes ? body : JSON.stringify(body),
  });
}

/**
 * HTTP PUT
 * @param  {string} url api endpoint
 * @param  {object} body
 * @return {Promise}
 */
export function put(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body),
  });
}

/**
 * HTTP DELETE
 * @param  {string} url api endpoint
 * @return {Promise}
 */
export function del(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'delete',
  });
}
