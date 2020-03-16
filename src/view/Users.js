import React, { Component } from 'react';
import ModelTable, { renderEnum, filterEnum } from '../component/ModelTable';
import UserForm from '../component/ModelForms/UserForm';

const types = {
  proprietaire: 'Proprietaire',
  freelance: 'Freelance',
  admin: 'Admin',
};

class Users extends Component {

  columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      searchable: true,
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
      searchable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      searchable: true,
    },
    {
      title: "Role",
      dataIndex: "type",
      key: "type",
      render: renderEnum(types),
      filters: filterEnum(types),
      filterMultiple: false,
    }
  ];

  render() {
    return (
      <ModelTable
        model='users'
        form={ UserForm }
        columns={ this.columns }
        rowActions={ (text, record) => (
          <React.Fragment>
          </React.Fragment>
        ) }
      />
    );
  }
}

export default Users;
