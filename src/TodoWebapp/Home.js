import { Button, Input, Layout, Form, DatePicker, TimePicker, Select, message } from 'antd';
import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import callAPI from '../ApiCall/ApiCaller';
import { useAuth } from '../Context/AuthContext';
import TableTodo from './TableTodo';
import 'antd/dist/antd.css';
import { Modal } from 'antd';

const { Header, Content, Footer } = Layout;
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
const data =[ {
  id:1,
  date:"2000-05-06",
  time:"05:04:04",
  name:"abc",
  status:true
},
{
  id:2,
  date:"2020-09-06",
  time:"15:54:04",
  name:"cde",
  status:true
},
{
  id:3,
  date:"2021-09-06",
  time:"12:43:44",
  name:"gmh",
  status:false
}
]
function Home() {
  const [CurrenTime, setCurrenTime] = useState('')
  const [CurrenDate, setCurrenDate] = useState('')
  const [todoList, setTodoList] = useState([]);
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const history = useHistory();

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

    // loadListTodo();
    setTodoList(data)

  }, []);

  return (
    <Layout className="layout">
      <Header >
        <div className="logo" />
        <Search placeholder="input name" onSearch={onSearch} enterButton size="small" />
      </Header>
      <Content style={{ padding: '50px 50px', height: "calc(91.8vh - 55px)" }}>
        <Button onClick={showModal} type="primary">
          Add
        </Button>
        <Modal title="Add Todo" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel} okText="Add" >
          <Form name="formadd" {...formItemLayout} onFinish={onFinish}   form={form}>
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
      <Footer style={{ textAlign: 'center', }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout >
  );
}

export default Home;
