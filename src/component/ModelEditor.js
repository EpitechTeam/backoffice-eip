import React, { Component } from 'react';
import { Modal, message } from 'antd';
import axios from 'axios';

class ModelEditor extends Component {

  state = {
    confirmLoading: false,
  }

  onSave = async beforeSave => {
    this.setState({ confirmLoading: true });
    const { _id, ...data } = beforeSave ? beforeSave(this.props.data.values) : this.props.data.values;

    try {
      const newData = (_id
        ? await axios.put(`/${this.props.model}/${_id}`, data)
        : await axios.post(`/${this.props.model}`, data)
      ).data;
      this.props.onSave(newData);
    } catch (error) {
      if (error.response && error.response.data) {
        this.props.onUpdate({}, error.response.data);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error('Unexpected error');
      }
    }
    this.setState({ confirmLoading: false });
  };

  render() {
    const { form: ModelForm, beforeSave } = this.props.form;
    const { _id } = this.props.data.values || {};
    const isNew = !_id;

    return (
      <Modal
        title={ (isNew ? 'New ' : '') + this.props.model.slice(0, -1) + (isNew ? '' : ' #' + _id)}
        visible={ this.props.data.values != null }
        onOk={ () => this.onSave(beforeSave) }
        confirmLoading={ this.state.confirmLoading }
        onCancel={ this.props.onCancel }
      >
        <ModelForm onUpdate={ this.props.onUpdate } data={ this.props.data.values || {} } errors={ this.props.data.errors || {} } isNew={ isNew } />
      </Modal>
    );
  }
}

export default ModelEditor;
