import { Table, Tag, Space } from 'antd';
import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    render: text => <td>{text}h</td>,
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
    render: (rowkey) => (
      <Space size="middle">
        <Link to={`/home/del?key=${rowkey}`}>Edit</Link>
        <Link to={`/home/del?key=${rowkey}`}>Delete</Link>
      </Space>
    ),
  },
];



function TableTodo({ todoList }) {
  const [todolist, setTodoList] = useState(todoList)
  // useEffect(() => {
  //   setTodoList(datau)
  // },[])
  return (
    <div>
      <Table columns={columns} dataSource={todolist} rowKey="id" />
    </div>
  )
}
const datau = [
  {
    key: '1',
    date: '23/09/2000',
    time: '24h',
    name: 'John Brown',
    status: 1,
  },
  {
    key: '2',
    time: '24h',
    name: 'John Brown234',
    status: 1,
  }
]

export default TableTodo


