import { Layout, Menu, Breadcrumb } from 'antd';

import React from 'react';
import RegistrationForm from './RegistrationForm';
const { Header, Content, Footer } = Layout;
function Register() {
  return (
    <Layout>
      <Content style={{ padding: '200px 600px',height: "calc(91.8vh - 55px)" }}>
        <RegistrationForm />
      </Content>
    </Layout>
  );
}

export default Register;
