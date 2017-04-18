/* eslint-disable class-methods-use-this, key-spacing, no-multi-spaces */

import _ from 'lodash';

import React from 'react';
import {
  Col,

  Accordion,
  Panel
} from 'react-bootstrap';

import If from './helpers/If';
import Spinner from './parts/Spinner';

export const PANEL_STYLES =
  {
    normal: null,
    darkBlue: 'primary',
    green: 'success',
    lightBlue: 'info',
    yellow: 'warning',
    red: 'danger'
  };

export const PANEL_SIZES =
  {
    tiny:   { xs: 12, sm: 3,  md: 2,  lg: 2  },
    small:  { xs: 12, sm: 4,  md: 4,  lg: 4  },
    medium: { xs: 12, sm: 6,  md: 6,  lg: 4  },
    large:  { xs: 12, sm: 12, md: 8,  lg: 6  },
    full:   { xs: 12, sm: 12, md: 12, lg: 12 }
  };

export default class Widget extends React.Component {
  constructor(props) {
    super(props);

    this._widgetOptions = {
      title: this.constructor.name,
      cssClass: this.constructor.name,

      lookAndFeel: 'panel',
      panelStyle: 'normal',
      panelSize: 'medium'
    };

    this.setWidgetOptions = this.setWidgetOptions.bind(this);
    this._renderWidget = this._renderWidget.bind(this);
  }

  setWidgetOptions(options) {
    this._widgetOptions = _.merge({}, this._widgetOptions, options);
  }

  _renderWidget() {
    throw new Error("_renderWidget() must be implemented.");
  }

  render() {
    const client = this.props.bossmodecgClient;

    const panelBsStyle = PANEL_STYLES[this._widgetOptions.panelStyle] || PANEL_STYLES.normal;
    const panelSizes = PANEL_SIZES[this._widgetOptions.panelSize] || PANEL_SIZES.medium;

    return (
      <Col className={ this._widgetOptions.cssClass }
           xs={ panelSizes.xs } sm={ panelSizes.sm }
           md={ panelSizes.md } lg={ panelSizes.lg }>
        <If condition={ this._widgetOptions.lookAndFeel === 'panel' }
            then={
              <Accordion>
                <Panel header={  this._widgetOptions.title }
                       bsStyle={ panelBsStyle }>
                  <If condition={ client.isConnected && client.isAuthenticated && client.isPopulated }
                      then={ () => this._renderWidget() }
                      else={ <Spinner /> } />
                </Panel>
              </Accordion>
            }
            else={
              () => {
                throw new Error(`Widget has invalid L&F: ${this._widgetOptions.lookAndFeel}`);
              }
            } />
      </Col>
    );
  }
}

Widget.propTypes = {
  bossmodecgClient: React.PropTypes.object.isRequired
};
