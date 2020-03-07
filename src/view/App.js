import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layout, Menu, Spin } from 'antd';
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios"
import Navigation from '../component/Navigation';
import RoutesHandler from '../component/RoutesHandler';
import Users from './Users';
import Missions from './Missions';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Footer } = Layout;

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
  {
    title: 'Missions',
    path: '/missions',
    component: () => (<Missions/>)
  },
].map(route => {
  route.path = '/admin' + route.path;
  return route;
});

class App extends Component {

  state = {
    ready: false,
    profile: null
  };

  async componentDidMount() {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/admin';
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.authenticate()
    };

    const profile = (await axios.post(process.env.REACT_APP_API_URL + '/me')).data;
    delete profile.tokens;
    delete profile.password;
    this.setState({
      ready: true,
      profile: {
        ...profile,
        fullname: `${profile.firstname} ${profile.lastname}`
      }
    });
  }

  authenticate() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('token')) {
      localStorage.setItem('token', urlParams.get('token'));
      window.parent.postMessage('token-stored', process.env.REACT_APP_FRONT_URL);
    }

    const token = localStorage.getItem('token');

    if (!token) {
      window.location.replace(process.env.REACT_APP_FRONT_URL + '/?login');
    }

    return token;
  }

  render() {
    const centered = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };
    console.log(this.state);

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
            <Navigation routes={ routes } />
          </Header>

          <Content className="app-content">
            <RoutesHandler routes={ routes } />
          </Content>

          <Footer className="app-footer">
            Willally ©2019-{ (new Date).getFullYear() } - { this.state.profile.fullname }
          </Footer>
        </Router>
      </Layout>
    );
  }
}

export default App;
