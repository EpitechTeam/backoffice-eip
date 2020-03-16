import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Divider, Popconfirm, Tag, Form, Input } from 'antd';
import axios from 'axios';
import moment from 'moment';
import ModelEditor from './ModelEditor';

const ButtonGroup = Button.Group;
const { Search } = Input;

function ModelTable(props) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    showSizeChanger: true,
    defaultPageSize: 10,
    pageSizeOptions: [ '5', '10', '25', '50', '100' ],
  });
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [form] = Form.useForm();

  const getFilteredId = useCallback(() => {
    const pathname = props.history.location.pathname.split('/').filter(Boolean);
    if (pathname.length === 3)
      return pathname.pop();
    return null;
  }, [props.history.location.pathname]);

  const filteredId = getFilteredId();

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

    if (filteredId)
      opts._id = filteredId;
    else if (search.length) {
      const searchFields = props.columns.filter(({ searchable }) => searchable).map(({ dataIndex }) => dataIndex);

      opts.search = search;
      opts.searchFields = searchFields.join(',');
    }

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
  }, [pagination, sorter, filters, search, props.model, filteredId, props.columns]);

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

  const onSearchChange = event => {
    const value = event.target.value;
    if (!value.length)
      setSearch('');

    if (searchTimeout)
      clearTimeout(searchTimeout);

    setSearchTimeout(setTimeout(() => {
      setSearch(value);
      setSearchTimeout(null);
    }, 400));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: renderModelId(props.model),
    },
    ...props.columns,
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <ButtonGroup>
          <Button onClick={ () => editRecord(record) }><EditOutlined /></Button>
          <Popconfirm placement="top" title={ 'Are you sure?' } onConfirm={ () => deleteRecord(text, record) } okText="Yes" cancelText="No">
            <Button><DeleteOutlined /></Button>
          </Popconfirm>
          <Divider type="vertical" />
          {props.rowActions(text, record)}
        </ButtonGroup>
      ),
    },
    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: formatDate,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: formatDate,
    }
  ];

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
      { filteredId
        ? null
        : <Search style={{ float: 'right', width: '200px' }} onSearch={ setSearch } onChange={ onSearchChange }/>
      }
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
        columns={columns}
      />
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
