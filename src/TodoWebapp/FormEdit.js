import { Form, DatePicker, TimePicker, Button, Input, Select, message } from 'antd';
import callAPI from '../ApiCall/ApiCaller';
import { useHistory } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import { useLocation } from "react-router-dom";
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
};


const FormEdit = () => {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    const status =new URLSearchParams(search).get('status');
    const id = new URLSearchParams(search).get('id');
    const date = new URLSearchParams(search).get('date');
    const time = new URLSearchParams(search).get('time');
    const { user } = useAuth();
    const history = useHistory();
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'id' : id,
            'date': fieldsValue['date'].format('YYYY-MM-DD'),
            'time': fieldsValue['time'].format('HH:mm:ss'),
        };
        values['username']=user.username;
        callAPI('update', 'PUT', values)
          .then((res) => {
            if (res.status == 200){
                message.success("Edit success");
                history.push('/home');
            }
          })
          .catch(err=>{ message.error("Edit success"); });
        console.log('Received values of form: ',  values);
    };
    return (
        <Form name="formadd" {...formItemLayout} onFinish={onFinish}>
            <Form.Item name="date" label="Date" {...config} initialValue={moment(date, "YYYY-MM-DD")}  >
                <DatePicker  />
            </Form.Item>
            <Form.Item name="time" label="Time" {...config} initialValue={moment(time, 'HH:mm:ss')} >
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
                    initialValue={name}
                >
                    <Input defaultValue={name} value={name} />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select status!' }]}
                    initialValue={status}
                >
                    <Select placeholder="select todo status" >
                        <Option value="false">Not Done</Option>
                        <Option value="true">Done</Option>

                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>
    )

};
export default FormEdit;