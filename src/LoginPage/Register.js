import { Layout, Menu, Breadcrumb } from 'antd';


import React from 'react'
import RegistrationForm from './RegistrationForm'
const { Header, Content, Footer } = Layout;
function Register() {
    return (
        <Layout>
            <Content style={{ padding: '350px 800px' }}>
                <RegistrationForm />
            </Content>
        </Layout>
    )
}

export default Register
