import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class Navigation extends Component {

  renderMenuItem = ({ title, path }, key) => (
    <Menu.Item key={ key }>
      <Link to={ path }>{ title }</Link>
    </Menu.Item>
  );

  logout = () => {
    localStorage.removeItem('token');
    window.location.replace(process.env.REACT_APP_FRONT_URL);
  }

  render() {
    const { location, routes } = this.props;
    const currentRoute = location.pathname.split('/').filter(Boolean)[1];
    const selectedRouteIndex = routes.findIndex(({ path }) => path.split('/').filter(Boolean)[1] === currentRoute);

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        selectedKeys={ [`${selectedRouteIndex}`] }
      >
        { routes.map(this.renderMenuItem) }
        <Menu.Item style={{ float: 'right' }}>
          <Icon type="logout" onClick={ this.logout }/>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(props => <Navigation {...props}/>);
