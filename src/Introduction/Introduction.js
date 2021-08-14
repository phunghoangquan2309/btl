import { Layout, Avatar, Breadcrumb } from 'antd';
import React from 'react'
import './Introduction.css';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import ContentIntro from './ContentIntro';
import { useHistory } from 'react-router-dom';
import Logo from '../Logo/Logo.png'


const { Header, Content, Footer } = Layout;







function Introduction() {
    const history = useHistory();
    function handleMenuClick(e) {
        history.push('/login');
    }
    const menu = (
        <Menu onClick={handleMenuClick} >
            <Menu.Item key="1" icon={<UserOutlined />}>
                Login
            </Menu.Item>
        </Menu>
    );
    return (
        <Layout className="layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" >
                    <img src={Logo} className="logox" />
                </div>
                <div className="avatarUser">
                    <Space wrap>

                        <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>

                        </Dropdown.Button>

                    </Space>,
                </div>
            </Header>
            <Content style={{ backgroundColor: 'white' }}>
                <ContentIntro />
            </Content>
            <Footer style={{ textAlign: 'center' }}>TodoApp ©2020 Created by Nhom 2</Footer>
        </Layout>
    )
}

export default Introduction
