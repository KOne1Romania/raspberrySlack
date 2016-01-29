/**
 * Created by matei.misarca on 29/01/16.
 */

import React, { Component, PropTypes } from 'react';
import * as TopoActions from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect()
export default class Site extends Component {
  render() {
    return <div>
      site
      <div onClick={::this.coffeeClick}>this is a coffee button</div>
    </div>
  }

  coffeeClick() {
    console.log("??? ", this.props)
    const {dispatch} = this.props
    dispatch(TopoActions.orderCoffee({
      fromUser: "matei.misarca",
      product: "cafea",
      toUser: "radu.parachiv",
      location: "AICI"
    }))
  }
}
