import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

class RoutesHandler extends Component {

  renderContentContainer = ({ path, exact, component }, key) => (
    <Route path={ path } exact={ exact } component={ component } className="backoffice-content-container" key={ key } />
  );

  render() {
    const path = this.props.location.pathname.split('/').filter(Boolean);
    path.shift();

    return (
      <Fragment>
        <Breadcrumb style={{ margin: '1em 0' }}>
          { path.length > 1 ? path.map(subpath => (
            <Breadcrumb.Item key={ subpath } style={{ textTransform: 'capitalize' }}>{ subpath }</Breadcrumb.Item>
          )) : null }
        </Breadcrumb>
        { this.props.routes.map(this.renderContentContainer) }
      </Fragment>
    );
  }
}

export default withRouter(props => <RoutesHandler {...props}/>);
