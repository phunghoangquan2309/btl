import { Button, Input, Layout, Form, DatePicker, TimePicker, Select, message, Breadcrumb, Menu,Space,Dropdown } from 'antd';
import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import callAPI from '../ApiCall/ApiCaller';
import { useAuth } from '../Context/AuthContext';
import TableTodo from './TableTodo';
import Logo from '../Logo/Logo.png'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import 'antd/dist/antd.css';


const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};
function Home() {
    const [CurrenTime, setCurrenTime] = useState('')
    const [CurrenDate, setCurrenDate] = useState('')
    const [todoList, setTodoList] = useState([]);
    const { user,logOut } = useAuth();
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };

    function handleMenuClick(e) {
        history.push('/');
        logOut();
    }
    const menu = (
        <Menu onClick={handleMenuClick} >
            <Menu.Item key="1" icon={<UserOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );


    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const onFinish = (fieldsValue) => {

        const values = {
            ...fieldsValue,
            'date': fieldsValue['date'].format('YYYY-MM-DD'),
            'time': fieldsValue['time'].format('HH:mm:ss'),
        };
        values['username'] = user.username;
        callAPI('add', 'POST', values)
            .then((res) => {
                message.success("Add success " + values.name);
                loadListTodo()
            })
            .catch(err => { message.error("Add error") });
        console.log('Received values of form: ', values);
        setIsModalVisible(false);
        form.resetFields();
    };


    function onSearch(value) {
        let endpoint = `search?username=${user.username}&name=${value}`;
        callAPI(endpoint, 'GET', null)
            .then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].key = res.data[i].id;
                    delete res.data[i].id;
                }
                console.log(res.data);
                setTodoList(res.data);
            })
            .catch((error) => {
                message.error('Loi tim kiem');
                console.log(error.response.data); // data
                console.log(error.response.status); // status code
                console.log(error.response.headers); // headers
            });
    }
    function loadListTodo() {
        let endpoint = `getlist?username=${user.username}`;
        callAPI(endpoint, 'GET', null)
            .then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].key = res.data[i].id;
                    delete res.data[i].id;
                }
                setTodoList(res.data);
            })
            .catch((err) => {
                alert('Loi');
                console.log(err);
            });
    }
    useEffect(() => {

        loadListTodo();
        // setTodoList(data)

    }, []);
    return (
        <Layout>
            <Header className="header" >
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
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1" icon={<LaptopOutlined />} >Home</Menu.Item>

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            height: 750
                        }}
                    >
                        <Button onClick={showModal} type="primary" className="add">
                            Add
                        </Button>
                        <Search placeholder="input name" onSearch={onSearch} enterButton size="small" />
                        <Modal title="Add Todo" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel} okText="Add" >
                            <Form name="formadd" {...formItemLayout} onFinish={onFinish} form={form}>
                                <Form.Item name="date" label="Date" {...config}
                                >
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item name="time" label="Time" {...config}
                                >
                                    <TimePicker />
                                </Form.Item>

                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="status"
                                    label="Status"
                                    rules={[{ required: true, message: 'Please select status!' }]}
                                    initialValue="false"
                                >
                                    <Select placeholder="select todo status">
                                        <Option value="false">Not Done</Option>
                                        <Option value="true">Done</Option>
                                    </Select>
                                </Form.Item>
                                <Button type="primary" htmlType="submit" hidden="true" >
                                    Add
                                </Button>

                            </Form>
                        </Modal>
                        <TableTodo todoList={todoList} setTodoList={setTodoList} />
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center', }}>
                TodoApp ©2020 Created by Nhom 2
            </Footer>
        </Layout>
    )
}

export default Home
