import React, { Component } from 'react';
import { Table } from 'antd';
import ModelTable, { renderModelId, renderThumbnail } from '../component/ModelTable';
import MissionForm from '../component/ModelForms/MissionForm';

const { Column } = Table;

class Misions extends Component {

  render() {
    return (
      <ModelTable
        model='missions'
        form={ MissionForm }
        rowActions={ (text, record) => (
          <React.Fragment>
          </React.Fragment>
        ) }>
        <Column
          title="User id"
          dataIndex="user_id"
          key="user_id"
          render={ renderModelId('users') }
        />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
        />
        <Column
          title="Object"
          dataIndex="object"
          key="object"
        />
        <Column
          title="House Owner"
          dataIndex="houseOwner"
          key="houseOwner"
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
        />
        <Column
          title="Status number"
          dataIndex="statusNb"
          key="statusNb"
        />
        <Column
          title="Date"
          dataIndex="date"
          key="date"
        />
        <Column
          title="City"
          dataIndex="city"
          key="city"
        />
        <Column
          title="Image"
          dataIndex="img"
          key="img"
          render={ renderThumbnail }
        />
        <Column
          title="Deal"
          dataIndex="deal"
          key="deal"
        />
      </ModelTable>
    );
  }
}

export default Misions;
