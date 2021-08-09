import { Form, DatePicker, TimePicker, Button, Input, Select, message } from 'antd';
import callAPI from '../ApiCall/ApiCaller';
import { useHistory } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
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


const FormAdd = () => {
  const {user} = useAuth();
  const history = useHistory();
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      'date': fieldsValue['date'].format('YYYY-MM-DD'),
      'time': fieldsValue['time'].format('HH:mm:ss'),
    };
    values['username']=user.username;
    callAPI('add', 'POST', values)
      .then((res) => {
        message.success("Add success "+values.name);
        history.push('/home');
      })
      .catch(err=>{ message.error("Add error") });
    console.log('Received values of form: ', values);
  };

  return (
    <Form name="formadd" {...formItemLayout} onFinish={onFinish}>
      <Form.Item name="date" label="Date" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="time" label="Time" {...config}>
        <TimePicker />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
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
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormAdd;