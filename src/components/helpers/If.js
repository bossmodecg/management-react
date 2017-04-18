/* eslint-disable react/prop-types */

import React from 'react';

export default class If extends React.Component {
  render() {
    const condition = this.props.condition;
    const then = this.props.then;
    const elseCond = this.props.else;
    const children = this.props.children;

    if (typeof condition === 'function' ? condition() : condition) {
      if (this.props.then) {
        return typeof then === 'function' ? then() : then;
      }

      return typeof children === 'function' ? children() : children;
    }

    if (elseCond) {
      return typeof elseCond === 'function' ? elseCond() : elseCond;
    }

    return null;
  }
}
