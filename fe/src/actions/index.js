/**
 * Created by matei.misarca on 29/01/16.
 */

import * as api from 'api';
import {Order} from 'constants';

export function orderCoffee(order) {
  return {
    type: [Order.ORDER, Order.ORDER_SUCCESS, Order.ORDER_FAIL],
    payload: api.orderCoffee(order)
  }
}
