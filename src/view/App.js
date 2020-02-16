import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layout, Menu, Spin } from 'antd';
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios"
import Navigation from '../component/Navigation';
import RoutesHandler from '../component/RoutesHandler';
import Users from './Users';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Content } = Layout;

const routes = [
  {
    title: 'Dashboard',
    path: '/',
    exact: true,
    component: () => (<div>TODO dashboard</div>)
  },
  {
    title: 'Users',
    path: '/users',
    component: () => (<Users/>)
  },
].map(route => {
  route.path = '/admin' + route.path;
  return route;
});

class App extends Component {

  state = {
    ready: false,
  };

  componentDidMount() {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/admin';
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + 'token'
    };
    this.setState({ ready: true });
  }

  render() {
    const centered = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };

    if (!this.state.ready)
      return (
        <div style={ centered }>
          <h1>Willally</h1>
          <Spin size="large" style={{
            marginLeft: '50%',
            transform: 'translate(-50%, 0)'
          }} />
        </div>
      );

    return (
      <Layout className="app">
        <Router>
          <Header className="app-header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
            <Navigation routes={ routes } />
            </Menu>
          </Header>

          <Content className="app-content">
            <RoutesHandler routes={ routes } />
          </Content>
        </Router>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
    profile: state.profile
  }
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
