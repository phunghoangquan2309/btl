import { Button, Input, Layout } from 'antd';
import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import callAPI from '../ApiCall/ApiCaller';
import { useAuth } from '../Context/AuthContext';
import TableTodo from './TableTodo';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

function Home() {
  const [todoList, setTodoList] = useState([]);
  const { user } = useAuth();
  const history = useHistory();

  function clickAdd() {
    history.push('/home/addtodo');
  }

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
        alert('Loi tim kiem');
        console.log(error.response.data); // data
        console.log(error.response.status); // status code
        console.log(error.response.headers); // headers
      });
  }

  React.useEffect(() => {
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
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '50px 50px' }}>
        <Button onClick={clickAdd} type="primary">
          Add
        </Button>
        <Search placeholder="input name" onSearch={onSearch} enterButton />
        <TableTodo todoList={todoList} setTodoList={setTodoList} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Home;
