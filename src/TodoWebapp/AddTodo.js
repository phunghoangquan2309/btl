import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import FormAdd from './FormAdd';

const { Header, Content, Footer } = Layout;
function AddTodo() {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
            </Header>
            <Content style={{ padding: '250px 300px' }}>
                <FormAdd/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default AddTodo
