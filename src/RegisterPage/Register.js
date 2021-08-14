import { Layout, Menu, Breadcrumb } from 'antd';

import React from 'react';
import RegistrationForm from './RegistrationForm';
const { Header, Content, Footer } = Layout;
function Register() {
  return (
    <Layout>
      <Content style={{ padding: '255px 600px' }}>
        <RegistrationForm />
      </Content>
    </Layout>
  );
}

export default Register;
