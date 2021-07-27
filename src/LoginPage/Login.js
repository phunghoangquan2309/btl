import { Layout } from 'antd';
import React, { Component,useState} from 'react'

import 'antd/dist/antd.css';
import MyAppName from './MyAppName';
import LoginForm from './LoginForm';


const { Content, Footer } = Layout;
function Login() {
   

    return (
        <Layout>
            <Content className="site-layout" style={{ padding: '355px 700px' }}>
                <MyAppName />
                <LoginForm/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TodoApp ©2020 Created by Nhom 2</Footer>
        </Layout>
    )
}

export default Login

