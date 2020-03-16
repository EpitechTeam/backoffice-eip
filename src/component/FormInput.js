import React from 'react';
import { Form, Input } from 'antd';

function FormInput({ name, label, input=Input, children, ...props }) {
  const InputTag = input;
  const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
  label = capitalize(label || name);

  return (
    <Form.Item name={ name } label={ label }>
      <InputTag
        placeholder={ label }
        { ...props }
      >
       { children }
      </InputTag>
    </Form.Item>
  );
};

export default FormInput;
