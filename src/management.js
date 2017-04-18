import axios from 'axios';
import URL from 'url-parse';

import React from 'react';
import ReactDOM from 'react-dom';

import ManagementLoader from './components/ManagementLoader';

export function launchApplication(rootElement, bossmodecgConfig, managementConfig, widgetSetup) {
  if (!bossmodecgConfig) {
    throw new Error("bossmodecgConfig must be provided.");
  }

  ReactDOM.render(
    <ManagementLoader bossmodecgConfig={ bossmodecgConfig }
                      managementConfig={ managementConfig }
                      widgetSetup={ widgetSetup } />,
    typeof rootElement === 'function' ? rootElement() : rootElement
  );
}

export async function fetchRemoteJSON(filePath) {
  return (await axios.get(filePath)).data;
}

export function doctorURL(url) {
  const currentURL = new URL(window.location.href);
  // eslint-disable-next-line no-template-curly-in-string
  return url.replace("${THIS_HOSTNAME}", currentURL.hostname);
}
