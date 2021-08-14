import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import callAPI from '../ApiCall/ApiCaller';
import { useAuth } from '../Context/AuthContext';

const LoginForm = () => {
  const { setUser } = useAuth();
  const history = useHistory();

  const onFinish = (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };
    callAPI('login', 'POST', user)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('login', JSON.stringify(user));
        history.push('/home');
      })
      .catch((error) => {
        message.warning("Login fail !!!")
      });
    // setUser(values)
    // localStorage.setItem('login', JSON.stringify(user));
    // history.push('/home');
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
        username: '',
        password: '',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
