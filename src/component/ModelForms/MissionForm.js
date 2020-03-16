import React from 'react';
import { Form, Input } from 'antd';
import FormInput from '../FormInput';

function MissionForm({ form, data }) {
  return (
    <Form labelCol={{ span: 4 }} form={ form } initialValues={ data }>
      <FormInput name="name" />
      <FormInput name="object" />
    </Form>
  );
}

export default MissionForm;
