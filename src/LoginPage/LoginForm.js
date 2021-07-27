import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import React, { Component } from 'react'
import { useHistory, Link } from 'react-router-dom';



export class LoginForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            account:{username:"",password:""}
        }
    }
    
    onFinish = (values) => {
        this.setState({account:{username:values.username,password:values.password}})
        console.log(this.state.account.username)
        console.log(this.state.account.password)
        console.log('Received values of form: ', values);
    };
    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
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
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        )
    }
}

export default LoginForm
