import _ from 'lodash';

import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,

  Grid,
  Row,
  Col,

  Tabs,
  Tab
} from 'react-bootstrap';
import { XS, SM, MD, LG } from './helpers/MediaQueries';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this._renderPage = this._renderPage.bind(this);
    this._renderWidget = this._renderWidget.bind(this);
  }

  _renderPage(pageSpec, eventKey) {
    // TODO: extend this (react-dnd?) to support rearranging of widgets.
    // TODO: when widgets are collapsed, these don't cleanly stack.
    const widgetSpecs = pageSpec.widgets;

    return (
      <Tab key={eventKey}
           eventKey={eventKey}
           title={pageSpec.title}>
        <Row style={{ paddingTop: '2rem' }}>
          <Col xs={12}>
            {
                  _.flattenDeep(
                    widgetSpecs.map((widgetSpec, idx) =>
                      this._renderWidget(widgetSpec, pageSpec, idx)
                    )
                  )
            }
          </Col>
        </Row>
      </Tab>
    );
  }

  _renderWidget(widget, pageSpec, idx) {
    const client = this.props.bossmodecgClient;

    return (
      <widget.type key={`${pageSpec.title}-${idx}`}
                   bossmodecgClient={ client }
                   { ...(widget.props || {}) } />
    );
  }

  render() {
    const pageSpecs = this.props.widgetSetup;

    return (
      <div id="App">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              BossmodeCG Manager
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem>
                <XS>
                  <span>xs</span>
                </XS>
              </NavItem>
              <NavItem>
                <SM>
                  <span>sm</span>
                </SM>
              </NavItem>
              <NavItem>
                <MD>
                  <span>md</span>
                </MD>
              </NavItem>
              <NavItem>
                <LG>
                  <span>lg</span>
                </LG>
              </NavItem>
              <NavItem href="https://github.com/eropple/bossmodecg">
                Github
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Grid>
          <Row>
            <Col xs={12}>
              <Tabs defaultActiveKey={0} animation={false} id="widget-pages">
                {
                  pageSpecs.map((pageSpec, idx) => this._renderPage(pageSpec, idx))
                }
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  bossmodecgClient: React.PropTypes.object.isRequired,
  managementConfig: React.PropTypes.object.isRequired,
  widgetSetup: React.PropTypes.object.isRequired
};
