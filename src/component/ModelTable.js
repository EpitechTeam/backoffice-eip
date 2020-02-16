import React, { Component } from 'react';
import { Table, Button, Icon, Divider, Popconfirm } from 'antd';
import axios from 'axios';
import moment from 'moment';
import ModelEditor from './ModelEditor';

const { Column } = Table;
const ButtonGroup = Button.Group;

class ModelTable extends Component {

  state = {
    data: [],
    pagination: {
      showSizeChanger: true,
      defaultPageSize: 10,
      pageSizeOptions: [ '5', '10', '25', '50', '100' ],
    },
    loading: false,
    editionData: null
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = async (opts={}) => {
    this.setState({ loading: true });

    const data = (await axios.get('/' + this.props.model, {
      params: {
        results: this.state.pagination.defaultPageSize,
        ...opts,
      }
    })).data;

    return this.setState({
      loading: false,
      data: data.results,
      pagination: {
        ...this.state.pagination,
        total: data.totalCount
      },
    });
  }

  addRecord = () => this.setState({ editionData: {} });

  editRecord = record => this.setState({ editionData: record });

  stopEdition = () => this.setState({ editionData: null });

  onSave = () => {
    this.stopEdition();
    this.fetch();
  }

  handleUpdate = updates => {
    this.setState({ editionData: { ...this.state.editionData, ...updates } });
  };

  deleteRecord = async record => {
    await axios.delete(`/${this.props.model}/${record._id}`);
    this.fetch();
  }

  render() {
    const formatDate = date => moment(date).format('YYYY-MM-DD HH:mm:ss');

    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.addRecord} type="primary" style={{ marginBottom: 16 }}>
            {'New ' + this.props.model.slice(0, -1)}
          </Button>
          <Button onClick={() => this.fetch()} type="primary" style={{ marginBottom: 16 }}>
            Reload
          </Button>
        </ButtonGroup>
        <ModelEditor
          model={this.props.model}
          form={this.props.form}
          data={this.state.editionData}
          onSave={this.onSave}
          onCancel={this.stopEdition}
          onUpdate={this.handleUpdate}
        />
        <Table
          rowKey={record => record._id}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          dataSource={ this.state.data.map(record => ({
            ...record,
            updatedAt: formatDate(record.updatedAt),
            createdAt: formatDate(record.updatedAt)
          }))}
        >
          <Column
            title="ID"
            dataIndex="_id"
            key="_id"
          />
          {this.props.children}
          <Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <ButtonGroup>
                <Button onClick={ () => this.editRecord(record) }><Icon type="edit" /></Button>
                <Popconfirm placement="top" title={ 'Are you sure?' } onConfirm={ () => this.deleteRecord(text, record) } okText="Yes" cancelText="No">
                  <Button><Icon type="delete" /></Button>
                </Popconfirm>
                <Divider type="vertical" />
                {this.props.rowActions(text, record)}
              </ButtonGroup>
            )}
          />
          <Column
            title="Updated at"
            dataIndex="updatedAt"
            key="updatedAt"
          />
          <Column
            title="Created at"
            dataIndex="createdAt"
            key="createdAt"
          />
        </Table>
      </div>
    );
  }
}

export default ModelTable;
