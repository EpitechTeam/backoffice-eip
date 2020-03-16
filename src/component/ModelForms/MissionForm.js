import React from 'react';
import { Form, Input } from 'antd';

function MissionForm({ form, data }) {
  return (
    <Form form={ form } initialValues={ data }>
      <Form.Item name="name">
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="object">
        <Input placeholder="Object" />
      </Form.Item>
    </Form>
  );
}

export default MissionForm;
