import { React, useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Table, Button, Input, Tooltip } from 'antd';
import TableTodo from './TableTodo';
import callAPI from '../ApiCall/ApiCaller';
import { useAuth } from '../Context/AuthContext';
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const data = [
  {
    id: '5',
    date: '23/09/2000',
    time: '25h',
    username:'Quan',
    name: 'A',
    status: 1,
  },
  {
    id: '6',
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
  const [todolist, setTodoList] = useState([])
  const { user } = useAuth();
  const history = useHistory();
  
  function clickAdd() {
    history.push("/home/addtodo")
  }
  function onSearch(value) {
    let endpoin = `search?username=${user.username}&name=${value}`;
    callAPI(endpoin, "GET", null)
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].key = res.data[i].id;
        delete res.data[i].id;
      }
      console.log(res.data)
      setTodoList(res.data)
    })
    .catch(err => { alert("Loi tim kiem"); console.log(err) })
  }
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '50px 50px' }}>
        <Button onClick={clickAdd} type="primary">Add</Button>
        <Search placeholder="input name" onSearch={onSearch} enterButton />
        <TableTodo todoList={todolist} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default Home

