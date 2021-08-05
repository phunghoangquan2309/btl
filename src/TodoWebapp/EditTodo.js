import React from 'react'
import { Layout} from 'antd';
import FormEdit from './FormEdit';

const { Header, Content, Footer } = Layout;
function EditTodo() {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
            </Header>
            <Content style={{ padding: '250px 300px' }}>
                <FormEdit/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default EditTodo
