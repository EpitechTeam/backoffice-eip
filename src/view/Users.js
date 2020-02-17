import React, { Component } from 'react';
import { Table } from 'antd';
import ModelTable, { renderEnum, filterEnum } from '../component/ModelTable';
import UserForm from '../component/ModelForms/UserForm';

const { Column } = Table;

const types = {
  proprietaire: 'Proprietaire',
  freelance: 'Freelance',
  admin: 'Admin',
};

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
          render={ renderEnum(types) }
          filters={ filterEnum(types) }
          filterMultiple={ false }
        />
      </ModelTable>
    );
  }
}

export default Users;
