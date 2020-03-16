import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Divider, Popconfirm, Tag, Form } from 'antd';
import axios from 'axios';
import moment from 'moment';
import ModelEditor from './ModelEditor';

const { Column } = Table;
const ButtonGroup = Button.Group;

function ModelTable(props) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    showSizeChanger: true,
    defaultPageSize: 10,
    pageSizeOptions: [ '5', '10', '25', '50', '100' ],
  });
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [form] = Form.useForm();

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setFilters(filters);
    setSorter(sorter);
  };

  const fetch = useCallback(async () => {
    setLoading(true);

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

    const data = (await axios.get('/' + props.model, {
      params: {
        results: pagination.defaultPageSize,
        ...opts,
      }
    })).data;

    pagination.total = data.totalCount;
    return await Promise.all([
      setLoading(false),
      setData(data.results),
      setPagination(pagination)
    ]);
  }, [pagination, sorter, filters, props.model]);

  useEffect(() => {
    fetch();
  }, [fetch, props.history.location.pathname, props.model]);

  const addRecord = () => editRecord({});

  const editRecord = async record => {
    await setEditedRecord(record);
    form.resetFields();
  };

  const stopEdition = () => setEditedRecord(null);

  const onSave = () => {
    stopEdition();
    fetch();
  };

  const deleteRecord = async record => {
    await axios.delete(`/${props.model}/${record._id}`);
    fetch();
  };

  const formatDate = date => date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null;

  return (
    <div>
      <ButtonGroup>
        <Button onClick={addRecord} type="primary" style={{ marginBottom: 16 }}>
          {'New ' + props.model.slice(0, -1)}
        </Button>
        <Button onClick={fetch} type="primary" style={{ marginBottom: 16 }}>
          Reload
        </Button>
      </ButtonGroup>
      <ModelEditor
        model={props.model}
        modelForm={props.form}
        form={form}
        data={editedRecord}
        onSave={onSave}
        onCancel={stopEdition}
      />
      <Table
        rowKey={record => record._id}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        dataSource={data}
      >
        <Column
          title="ID"
          dataIndex="_id"
          key="_id"
          render={ renderModelId(props.model) }
        />
        {props.children}
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <ButtonGroup>
              <Button onClick={ () => editRecord(record) }><EditOutlined /></Button>
              <Popconfirm placement="top" title={ 'Are you sure?' } onConfirm={ () => deleteRecord(text, record) } okText="Yes" cancelText="No">
                <Button><DeleteOutlined /></Button>
              </Popconfirm>
              <Divider type="vertical" />
              {props.rowActions(text, record)}
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
