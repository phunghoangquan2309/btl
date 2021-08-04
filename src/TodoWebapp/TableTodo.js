import { Table, Tag, Space } from 'antd';
import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import callAPI from '../ApiCall/ApiCaller';
import { useAuth } from '../Context/AuthContext';




function TableTodo({ todoList }) {
  const [todolist, setTodoList] = useState(todoList)
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
      render: text => <td>{text}</td>,
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
        status = status == 1 ? 'Done' : 'Not Done'
        return (
          <Tag color={color} >
            {status.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => {
        return (
          <Space size="middle">
            <Link to={`/home/del?key=${record.key}`}>Edit</Link>
            <Link onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn xóa ?')) {
                let endpoin = `delete?id=${record.key}`
                callAPI(endpoin, "DELETE", null)
                  .then(res => {
                    if (res.status === 200) {
                      alert("Thanh cong")
                    const udtodolist = Object.values(todolist).filter(function (obj) {
                        return obj.key !== record.key;
                      });
                      setTodoList(udtodolist)
                    }
  
                  })
                  .catch(err => { alert("Error"); console.log(err) })
              }
            }}>Delete</Link>
          </Space>
        )
      }
    },
  ];
  useEffect(() => {
    let endpoin = `getlist?username=${user.username}`;
    callAPI(endpoin, "GET", null)
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].key = res.data[i].id;
          delete res.data[i].id;
        }
        setTodoList(res.data)
      })
      .catch(err => { alert("Loi"); console.log(err) })
  }, [])
  return (
    <div>
      <Table columns={columns} dataSource={todolist} rowKey={record => record.id} />
    </div>
  )
}

export default TableTodo


