/**
 * Created by matei.misarca on 29/01/16.
 */

import * as request from "./../utils/request"

const endPoint = __DEV__ ? 'http://www.localhost:3040' : 'http://www.orderCoffee';

export function orderCoffee(order) {
  return request.post(`${endPoint}/order`, order);
}
