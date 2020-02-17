import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Table, Button, Icon, Divider, Popconfirm, Tag } from 'antd';
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
    sorter: {},
    filters: {},
    loading: false,
    editionData: {}
  };

  componentDidMount() {
    this.fetch();
    this.unlistenHistory = this.props.history.listen(location => {
      if (location.pathname.startsWith(`/admin/${this.props.model}`))
        this.fetch();
    });
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({ pagination, filters, sorter }, this.fetch)
  }

  fetch = async () => {
    this.setState({ loading: true });

    const { pagination, sorter, filters } = this.state;
    const opts = {
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    }

    const pathname = window.location.pathname.split('/').filter(Boolean);
    if (pathname.length === 3)
      opts._id = pathname.pop();

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

  addRecord = () => this.setState({ editionData: { values: {} } });

  editRecord = record => this.setState({ editionData: { values: record } });

  stopEdition = () => this.setState({ editionData: {} });

  onSave = () => {
    this.stopEdition();
    this.fetch();
  }

  handleUpdate = (updates, errors) => {
    this.setState({ editionData: {
      values: { ...this.state.editionData.values, ...updates },
      errors: errors || this.state.editionData.errors,
    }});
  };

  deleteRecord = async record => {
    await axios.delete(`/${this.props.model}/${record._id}`);
    this.fetch();
  }

  renderId = id => {
    return <Link to={ `/admin/${this.props.model}/${id}`}>{id}</Link>
  }

  render() {
    const formatDate = date => date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null;

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
          dataSource={this.state.data}
        >
          <Column
            title="ID"
            dataIndex="_id"
            key="_id"
            render={ renderModelId(this.props.model) }
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
            render={ formatDate }
          />
          <Column
            title="Created at"
            dataIndex="createdAt"
            key="createdAt"
            render={ formatDate }
          />
        </Table>
      </div>
    );
  }
}

export default withRouter(props => <ModelTable {...props}/>);

export const renderModelId = model => id => {
  return id
    ? (
      <Link to={ `/admin/${model}/${id}` } title={ id }>
        <Tag color={ '#' + id.slice(-6) }>#</Tag>{ id.slice(-6) }
      </Link>
    ) : null;
};

export const renderThumbnail = url => {
  return url
    ? <img src={ url } alt="thumbnail" style={{ maxHeight: '5em', maxWidth: '5em' }} />
    : null;
};

export const renderEnum = enumValues => name => {
  return enumValues[name];
};

export const filterEnum = enumValues => {
  return Object.keys(enumValues).map(name => ({
    text: enumValues[name], value: name
  }));
};
