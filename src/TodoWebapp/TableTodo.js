import { Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../ApiCall/ApiCaller';
import { useAuth } from '../Context/AuthContext';

function TableTodo({ todoList, setTodoList }) {
  const { user } = useAuth();
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
        return (
          <Space size="middle">
            <Link to={`/home/edittodo?id=${record.key}&date=${text.date}&time=${text.time}&name=${text.name}&status=${text.status}`}>Edit</Link>
            <Link
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn xóa ?')) {
                  let endpoin = `delete?id=${record.key}`;
                  callAPI(endpoin, 'DELETE', null)
                    .then((res) => {
                      if (res.status === 200) {
                        alert('Thanh cong');
                        const filteredTodos = Object.values(todoList).filter(
                          function (obj) {
                            return obj.key !== record.key;
                          },
                        );
                        setTodoList(filteredTodos);
                      }
                    })
                    .catch((err) => {
                      alert('Error');
                      console.log(err);
                    });
                }
              }}
            >
              Delete
            </Link>
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
