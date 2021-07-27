import './App.css';
import Login from './LoginPage/Login';
import {BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import Home from './LoginPage/Home';
import Register from './LoginPage/Register';
function App() {
  console.log(localStorage.getItem("login"))
  return (
    <div className="App">
      <Router>
            <Switch>
                <Route path="/home" render={() => { return localStorage.getItem("login")?<Home/>:<Redirect to="/"/>
              }} >
                </Route>
                <Route path="/register">
                  <Register/>
                </Route>
                <Route path="/">
                    <Login></Login>
                </Route>

            </Switch>
        </Router>
    </div>
  );
}

export default App;
