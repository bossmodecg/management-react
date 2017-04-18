import React from 'react';

import Widget from '../components/Widget';

export default class SocketInformation extends Widget {
  constructor(props) {
    super(props);

    this.setWidgetOptions({ title: "Socket Information" });
  }

  _renderWidget() {
    const client = this.props.bossmodecgClient;

    return (
      <p>
        Socket ID: { client.id }<br />
        Connected: { client.isConnected.toString() }<br />
        Authenticated: { client.isAuthenticated.toString() }
      </p>
    );
  }
}
