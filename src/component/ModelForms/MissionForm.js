import React, { Component } from 'react';
import {
  Form, Input
} from 'antd';
import ModelForm from '../ModelForm';

class MissionForm extends Component {

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('name')(
            <Input placeholder="Name" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('object')(
            <Input placeholder="Object" />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default ModelForm(MissionForm, mission => {
  return mission;
});
