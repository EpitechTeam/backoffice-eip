import React, { Component } from 'react';
import { Table } from 'antd';
import ModelTable from '../component/ModelTable';
import UserForm from '../component/ModelForms/UserForm';

const { Column } = Table;

class Users extends Component {

  render() {
    return (
      <ModelTable
        model='users'
        form={ UserForm }
        rowActions={ (text, record) => (
          <React.Fragment>
          </React.Fragment>
        ) }>
        <Column
          title="Firstname"
          dataIndex="firstname"
          key="firstname"
        />
        <Column
          title="Lastname"
          dataIndex="lastname"
          key="lastname"
        />
        <Column
          title="Email"
          dataIndex="email"
          key="email"
        />
        <Column
          title="Role"
          dataIndex="type"
          key="type"
        />
      </ModelTable>
    );
  }
}

export default Users;
