import React, { Component } from 'react';
import {
  Form, Icon, Input, Select
} from 'antd';
import ModelForm from '../ModelForm';

const Option = Select.Option;

class UserForm extends Component {

  state = {
    isNew: true
  }

  async componentDidMount() {
    await this.setState({ isNew: !this.props.form.getFieldValue('_id') });
  }

  handleRoleChange = role => {
    if (!role)
      return;

    this.props.form.setFieldsValue({ type: role });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('firstname')(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Firstname"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('lastname')(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Lastname"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email')(
            <Input placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('type')(
            <Select
              mode="single"
              style={{ width: '100%' }}
              placeholder="Role"
              onChange={ this.handleRoleChange }
            >
              { [ 'proprietaire', 'freelance', 'admin' ].map(role => (<Option key={role}>{role}</Option>)) }
            </Select>
          )}
        </Form.Item>
        { this.state.isNew ? (
          <Form.Item>
            {getFieldDecorator('password')(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
        ) : null }
      </Form>
    );
  }
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

export default ModelForm(UserForm, user => {
  if (!user.id && !user.password) {
    user.password = randomPassword(12);
    alert(`Password: "${user.password}" (it will only be displayed once)`);
  }

  if (user.id) {
    delete user.password;
  } else {
    user.emailVerified = true;
  }

  return user;
});
