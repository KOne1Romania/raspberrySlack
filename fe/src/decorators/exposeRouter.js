import React, { PropTypes } from 'react';
export default function ExposeRouter(ComponentClass) {
  return React.createClass({
    displayName: 'ExposeRouter',
    contextTypes: {
      router: PropTypes.func.isRequired,
    },
    render() {
      return <ComponentClass {...this.props} router={this.context.router}/>;
    }
  });
}
