/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import MediaQuery from 'react-responsive';

export class XS extends React.Component {
  render() {
    return (
      <MediaQuery query="(max-width: 767px)">
        { this.props.children }
      </MediaQuery>
    );
  }
}

XS.propTypes = {
  children: React.PropTypes.element
};

export class SM extends React.Component {
  render() {
    return (
      <MediaQuery query="(min-width: 768px)">
        { this.props.children }
      </MediaQuery>
    );
  }
}

SM.propTypes = {
  children: React.PropTypes.element
};

export class SMOnly extends React.Component {
  render() {
    return (
      <MediaQuery query="(min-width: 768px) and (max-width: 991px)">
        { this.props.children }
      </MediaQuery>
    );
  }
}

SMOnly.propTypes = {
  children: React.PropTypes.element
};

export class MD extends React.Component {
  render() {
    return (
      <MediaQuery query="(min-width: 992px)">
        { this.props.children }
      </MediaQuery>
    );
  }
}

MD.propTypes = {
  children: React.PropTypes.element
};

export class MDOnly extends React.Component {
  render() {
    return (
      <MediaQuery query="(min-width: 992px) and (max-width: 1199px)">
        { this.props.children }
      </MediaQuery>
    );
  }
}

MDOnly.propTypes = {
  children: React.PropTypes.element
};

export class LG extends React.Component {
  render() {
    return (
      <MediaQuery query="(min-width: 1200px)">
        { this.props.children }
      </MediaQuery>
    );
  }
}

LG.propTypes = {
  children: React.PropTypes.element
};
