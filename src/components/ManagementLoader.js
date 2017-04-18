/* eslint-disable react/prop-types */

import _ from 'lodash';

import React from 'react';
import { Helmet } from "react-helmet";

import BossmodeCGClient from '@bossmodecg/client';

import App from './App';
import If from './helpers/If';
import Spinner from './parts/Spinner';

import { doctorURL } from '../management';
import DEFAULT_CONFIG from '../default_config';

function buildBossmodeCGClient(cfg, rootComponent) {
  // eslint-disable-next-line no-param-reassign
  cfg.endpoint = doctorURL(cfg.endpoint);

  const bossmodecgClient = new BossmodeCGClient.ManagementClient(cfg);
  bossmodecgClient.connect();

  bossmodecgClient.on('bossmodecg.forceUpdate', () => rootComponent.forceUpdate());

  return bossmodecgClient;
}

export default class ManagementLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { bossmodecgClient: null, managementConfig: null };
    this.logger = new BossmodeCGClient.Logger(this.constructor.name);
  }

  componentWillMount() {
    const bossmodecgConfig = this.props.bossmodecgConfig;
    const managementConfig = this.props.managementConfig;

    switch (typeof bossmodecgConfig) {
      case 'function': {
        (async () => {
          this.logger.debug("bossmodecgConfig is a function; executing before client instantiation.");
          const cfg = await bossmodecgConfig();

          this.logger.debug("fetched bossmode config.");

          this.setState({ bossmodecgClient: buildBossmodeCGClient(cfg, this) });
        })();
        break;
      }
      case 'object': {
        this.logger.debug("bossmodecgConfig is an object; instantiating client directly.");

        const bossmodecgClient = new BossmodeCGClient.ManagementClient(bossmodecgConfig);
        bossmodecgClient.connect();

        this.setState({ bossmodecgClient: buildBossmodeCGClient(bossmodecgConfig, this) });
        break;
      }
      default: {
        this.logger.error("Unrecognized value for bossmodecgConfig", bossmodecgConfig);
      }
    }

    switch (typeof managementConfig) {
      case 'function':
        (async () => {
          this.logger.debug("managementConfig is a function; executing to set state.");
          const c = await managementConfig();

          this.logger.debug("fetched management config.");
          this.setState({
            managementConfig: _.merge({}, DEFAULT_CONFIG, c) }
          );
        })();

        break;
      case 'object':
        this.logger.debug("managementConfig is an object; placing into state.");
        this.setState({
          managementConfig: _.merge({}, DEFAULT_CONFIG, managementConfig) }
        );

        break;
      default:
        this.logger.error("Unrecognized value for managementConfig", managementConfig);
    }
  }

  render() {
    const bossmodecgClient = this.state.bossmodecgClient;
    const managementConfig = this.state.managementConfig;

    const cssLoads = (managementConfig || {}).cssLoads || [];

    return (
      <div id="Loader">
        <Helmet id="helmet">
          {
            _.flatten(
              [
                <title key="title">BossmodeCG Manager</title>,
                cssLoads.map((cssLoad) =>
                  <link key={ cssLoad }
                        rel="stylesheet"
                        type="text/css"
                        href={ cssLoad } />
                )
              ]
            )
          }
        </Helmet>
        <If key="if"
            condition={ managementConfig && bossmodecgClient && bossmodecgClient.isAuthenticated }
            then={
              () => <App bossmodecgClient={ bossmodecgClient }
                         managementConfig={ managementConfig }
                         widgetSetup={ this.props.widgetSetup } />
            }
            else={
              <Spinner />
            } />
      </div>
    );
  }
}
