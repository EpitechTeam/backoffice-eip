import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';

const Option = Select.Option;

function UserForm({ form, data, isNew }) {

  const handleRoleChange = role => {
    if (!role)
      return;

    form.setFieldsValue({ type: role });
  }

  return (
    <Form form={ form } initialValues={ data }>
      <Form.Item name="firstname">
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Firstname"
        />
      </Form.Item>
      <Form.Item name="lastname">
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Lastname"
        />
      </Form.Item>
      <Form.Item name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="type">
        <Select
          mode="single"
          style={{ width: '100%' }}
          placeholder="Role"
          onChange={ handleRoleChange }
        >
          { [ 'proprietaire', 'freelance', 'admin' ].map(role => (<Option key={role}>{role}</Option>)) }
        </Select>
      </Form.Item>
      { isNew ? (
        <Form.Item name="password">
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
      ) : null }
    </Form>
  );
}

function randomPassword(length) {
    const chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    const password = [];
    for (let x = 0; x < length; x++) {
        let i = Math.floor(Math.random() * chars.length);
        password.push(chars.charAt(i));
    }
    return password.join('');
}

UserForm.beforeSave = (user, isNew) => {
  if (isNew && !user.password) {
    user.password = randomPassword(12);
    alert(`Password: "${user.password}" (it will only be displayed once)`);
  }

  if (isNew) {
    user.emailVerified = true;
  } else {
    delete user.password;
  }

  return user;
};

export default UserForm;
