import { message, Popconfirm, Space, Tag, Table, DatePicker, TimePicker, Button, Input, Select, Form } from 'antd';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../ApiCall/ApiCaller';
import { useAuth } from '../Context/AuthContext';
import { Modal } from 'antd';
import moment from 'moment';
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
}
function TableTodo({ todoList, setTodoList }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idEdit, setIdEdit] = useState(undefined);
  const { user } = useAuth();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  function confirm(record, text) {
    let endpoin = `delete?id=${record.key}`;
    callAPI(endpoin, 'DELETE', null)
      .then((res) => {
        if (res.status === 200) {
          message.success("Delete success " + text.name);;
          const filteredTodos = Object.values(todoList).filter(
            function (obj) {
              return obj.key !== record.key;
            },
          );
          setTodoList(filteredTodos);
        }
      })
      .catch((err) => {
        message.success("Delete error");;
        console.log(err);
      });

  }
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      'id': idEdit,
      'date': fieldsValue['date'].format('YYYY-MM-DD'),
      'time': fieldsValue['time'].format('HH:mm:ss'),
    };
    values['username'] = user.username;
    callAPI('update', 'PUT', values)
      .then((res) => {
        if (res.status == 200) {
          message.success("Edit success");
          loadListTodo();
        }
      })
      .catch(err => { message.error("Edit success"); });
    console.log('Received values of form: ', values);
    setIsModalVisible(false);
    form.resetFields();
  };
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
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text) => <td>{text}</td>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = status == 1 ? 'green' : 'volcano';
        status = status == 1 ? 'Done' : 'Not Done';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record, text) => {
        let data = { date: moment(text.date, "YYYY-MM-DD"), time: moment(text.time, 'HH:mm:ss'), name: text.name, status: text.status }
        return (
          <Space size="middle">
            <Link onClick={() => { setIdEdit(record.key); setIsModalVisible(true); console.log(data);form.setFieldsValue(data) }}>Edit</Link>
            <Modal title="Edit Todo" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel} okText="Edit" >
              <Form name="formedit" {...formItemLayout} onFinish={onFinish} form={form} >
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
                >
                  <Select placeholder="select todo status">
                    <Option value={false}>Not Done</Option>
                    <Option value={true}>Done</Option>
                  </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" hidden="true" >
                  Edit
                </Button>

              </Form>
            </Modal>

            <Popconfirm
              title="Are you sure to delete this to do?"
              okText="Yes"
              onConfirm={() => { confirm(record, text) }}
              cancelText="No"
            >
              <Link>
                Delete
              </Link>
            </Popconfirm>,

          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={todoList}
        rowKey={(record) => record.id}
      />
    </div>
  );
}

export default TableTodo;
