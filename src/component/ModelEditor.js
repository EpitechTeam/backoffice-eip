import React, { Component } from 'react';
import { Modal } from 'antd';
import axios from 'axios';

class ModelEditor extends Component {

  state = {
    confirmLoading: false,
    data: null
  }

  onSave = async beforeSave => {
    const { _id, ...data } = beforeSave ? beforeSave(this.props.data) : this.props.data;
    const newData = (_id
      ? await axios.put(`/${this.props.model}/${_id}`, data)
      : await axios.post(`/${this.props.model}`, data)
    ).data;

    this.props.onSave(newData);
  };

  render() {
    const { form: ModelForm, beforeSave } = this.props.form;
    const { _id } = this.props.data || {};

    return (
      <Modal
        title={ this.props.model.slice(0, -1) + (_id ? ' #' + _id : '')}
        visible={ this.props.data != null }
        onOk={ () => this.onSave(beforeSave) }
        confirmLoading={ this.state.confirmLoading }
        onCancel={ this.props.onCancel }
      >
        { this.props.data != null
          ? <ModelForm onUpdate={ this.props.onUpdate } data={ this.props.data } />
          : null
        }
      </Modal>
    );
  }
}

export default ModelEditor;
