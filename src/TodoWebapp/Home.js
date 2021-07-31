import { React, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table, Button, Input, Tooltip } from 'antd';
import TableTodo from './TableTodo';
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const data = [
  {
    id: '1',
    date: '23/09/2000',
    time: '24h',
    name: 'A',
    status: 1,
  },
  {
    id: '2',
    date: '23/09/2000',
    time: '24h',
    name: 'B',
    status: 0,
  },
  {
    id: '3',
    date: '23/09/2000',
    time: '24h',
    name: 'John Brown342',
    status: 1,
  },
  {
    id: '4',
    date: '23/09/2000',
    time: '24h',
    name: 'John Brown342',
    status: 0,
  }

];

function Home() {
  const [todolist, setTodoList] = useState(data)
  const history = useHistory();
  function clickAdd() {
    history.push("/home/addtodo")
  }
  function onSearch(value) {
    
  }
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '50px 50px' }}>
        <Button onClick={clickAdd} type="primary">Add</Button>
        <Search placeholder="input search name" onSearch={onSearch} enterButton />
        <TableTodo todoList={todolist} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default Home

