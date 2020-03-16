import React, { Component } from 'react';
import { Modal, message } from 'antd';
import axios from 'axios';

class ModelEditor extends Component {

  state = {
    confirmLoading: false,
  }

  onSave = async () => {
    this.setState({ confirmLoading: true });
    const beforeSave = this.props.modelForm.beforeSave || (data => data);
    const _id = this.props.data._id;
    const data = beforeSave(await this.props.form.validateFields(), !_id);

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
    const ModelForm = this.props.modelForm;
    const { _id } = this.props.data || {};
    const isNew = !_id;

    return (
      <Modal
        title={ (isNew ? 'New ' : '') + this.props.model.slice(0, -1) + (isNew ? '' : ' #' + _id)}
        visible={ this.props.data != null }
        onOk={ this.onSave }
        confirmLoading={ this.state.confirmLoading }
        onCancel={ this.props.onCancel }
      >
        <ModelForm form={ this.props.form } data={ this.props.data } isNew={ isNew } />
      </Modal>
    );
  }
}

export default ModelEditor;
