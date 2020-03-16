import React, { Component } from 'react';
import moment from 'moment';
import ModelTable, { renderModelId, renderThumbnail, renderEnum, filterEnum } from '../component/ModelTable';
import MissionForm from '../component/ModelForms/MissionForm';

const status = {
  CURRENT: 'Current',
  WAITING: 'Waiting',
  DONE: 'Done',
};

class Misions extends Component {

  columns = [
    {
      title: 'User id',
      dataIndex: 'user_id',
      key: 'user_id',
      render: renderModelId('users'),
      searchable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      searchable: true,
    },
    {
      title: 'Object',
      dataIndex: 'object',
      key: 'object',
      searchable: true,
    },
    {
      title: 'House Owner',
      dataIndex: 'houseOwner',
      key: 'houseOwner',
      searchable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: renderEnum(status),
      filters: filterEnum(status),
      filterMultiple: false,
    },
    {
      title: 'Status number',
      dataIndex: 'statusNb',
      key: 'statusNb',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD'),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      searchable: true,
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: renderThumbnail,
    },
    {
      title: 'Deal',
      dataIndex: 'deal',
      key: 'deal',
      sorter: (a, b) => a.deal - b.deal,
      searchable: true,
    }
  ];

  render() {
    return (
      <ModelTable
        model='missions'
        form={ MissionForm }
        columns={ this.columns }
        rowActions={ (text, record) => (
          <React.Fragment>
          </React.Fragment>
        ) }
      />
    );
  }
}

export default Misions;
