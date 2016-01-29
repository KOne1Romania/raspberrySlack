/**
 * Created by matei.misarca on 29/01/16.
 */

import React, { Component, PropTypes } from 'react';
import * as TopoActions from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import coffees from './../constants/coffeeS'

@connect()
export default class Site extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      recipient: "",
      location: ""
    }
  }

  render() {
    console.log("??? ", coffees)
    return <div style={{display: 'block'}}>
      <label style={{display: 'block'}}>userName</label>
      <input style={{display: 'block'}} type="text" onChange={::this.userOnChange} name="user" value={this.state.user}/>
      <label style={{display: 'block'}}>order recipient</label>
      <input style={{display: 'block'}} type="text" onChange={::this.userOnChange} name="recipient" value={this.state.recipient}/>
      <label style={{display: 'block'}}>order location</label>
      <input style={{display: 'block'}} type="text" onChange={::this.userOnChange} name="location" value={this.state.location}/>
      {
        coffees.map((coffee) => {
          return <button style={{display: 'block'}} type="button" id={coffee.id} key={coffee.id} name={coffee.product}
                      onClick={::this.coffeeClick}>{coffee.product}</button>
        })
      }
    </div>
  }

  userOnChange(evt) {
    console.log("??? ", evt.target.value)
    if (evt.target.name === "user")
      this.setState({
        user: evt.target.value
      })
    else if (evt.target.name === "recipient")
      this.setState({
        recipient: evt.target.value
      })
    else if (evt.target.name === "location")
      this.setState({
        location: evt.target.value
      })
  }

  coffeeClick(evt) {
    console.log("??? ", evt.target, evt.target.name, evt.currentTarget.name);
    const {dispatch} = this.props;
    if (this.state.user !== '' && this.state.recipient !== '' && this.state.location !== '')
    dispatch(TopoActions.orderCoffee({
      fromUser: this.state.user,
      product: evt.target.name || evt.currentTarget.name,
      toUser: this.state.recipient,
      location: this.state.location
    }))
  }
}
