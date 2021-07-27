import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import LoginForm from './LoginForm';
import MyAppName from './MyAppName';

const { Content, Footer } = Layout;
function Login() {
  return (
    <Layout>
      <Content className="site-layout" style={{ padding: '355px 700px' }}>
        <MyAppName />
        <LoginForm />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        TodoApp ©2020 Created by Nhom 2
      </Footer>
    </Layout>
  );
}

export default Login;
