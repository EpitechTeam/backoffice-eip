import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import FormInput from '../FormInput';

const Option = Select.Option;

function UserForm({ form, isNew }) {

  const handleRoleChange = role => {
    if (!role)
      return;

    form.setFieldsValue({ type: role });
  }

  return (
    <React.Fragment>
      <FormInput
        name="firstname"
        prefix={<UserOutlined />}
      />
      <FormInput
        name="lastname"
        prefix={<UserOutlined />}
      />
      <FormInput name="email" />
      <FormInput
        name="type"
        label="role"
        input={ Select }
        mode="single"
        style={{ width: '100%' }}
        onChange={ handleRoleChange }
      >
        { [ 'proprietaire', 'freelance', 'admin' ].map(role => (<Option key={ role }>{ role }</Option>)) }
      </FormInput>
      { isNew ? (
        <FormInput
          name="password"
          type="password"
          prefix={<LockOutlined />}
        />
      ) : null }
    </React.Fragment>
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
