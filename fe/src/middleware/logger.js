/**
 * Logger middleware used for debugging purposes
 * @param      {Function} getState
 * @return     {Object} new state
 */
export default function logger({ getState }) {
  return (next) => (action) => {
    const result = next(action);
    console.log('next state', getState());
    return result;
  };
}
