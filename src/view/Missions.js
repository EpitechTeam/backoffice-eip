import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import ModelTable, { renderModelId, renderThumbnail, renderEnum, filterEnum } from '../component/ModelTable';
import MissionForm from '../component/ModelForms/MissionForm';

const { Column } = Table;

const status = {
  CURRENT: 'Current',
  WAITING: 'Waiting',
  DONE: 'Done',
};

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
          render={ renderEnum(status) }
          filters={ filterEnum(status) }
          filterMultiple={ false }
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
          sorter={ (a, b) => moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD') }
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
          sorter={ (a, b) => a.deal - b.deal }
        />
      </ModelTable>
    );
  }
}

export default Misions;
