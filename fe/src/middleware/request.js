import Immutable from 'immutable';

/**
 * Request middleware used for handling sync and async actions
 * @param      {Function} getState
 * @return     {Object} new state
 */
export default function request() {
  return (next) => (action) => {
    const { type, payload = null, ...other} = action;

    // check to see if we have a sync action;
    if (!type || type.constructor !== Array) {
      //action.payload = Immutable.fromJS(action.payload);

      // dispatch change with immutable data
      return next(action);
    }

    // if we have a type array it means that we have an async action
    // get action types
    const [REQUEST, SUCCESS, FAIL] = type;
    next({type: REQUEST, ...other});

    return payload.then(
        (result)=> {
          if (result.ok) {
            result.json().then(json=> {
              // convert data from server to immutable data
              //const payload = Immutable.fromJS(json);

              const payload = json;
              console.log('result', payload)

              // Keep this if we want to switch off to non immutable data
              // const payload = json;
              // when sever call finished ok dispatch change with immutable data
              next({
                ...other, payload, type: SUCCESS,
              });
            });
          } else {
            // when sever call failed dispatch change with no payload
            next({
              ...other, type: FAIL,
            });
          }
        },

        (error) => {
          // when sever call failed dispatch change with no payload
          next({
            ...other, error, type: FAIL,
          });
        }
    );
  };
}
