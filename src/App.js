import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { useAuth } from './Context/AuthContext';
import Home from './LoginPage/Home';
import Login from './LoginPage/Login';
import Register from './LoginPage/Register';

const PrivateRoute = (props) => {
  const { user } = useAuth();
  return user ? <Route {...props} /> : <Redirect to="/login" />;
};

const PublicRoute = (props) => {
  return <Route {...props} />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute
            path="/home"
            render={() => {
              return localStorage.getItem('login') ? (
                <Home />
              ) : (
                <Redirect to="/" />
              );
            }}
          />
          <PublicRoute path="/register">
            <Register />
          </PublicRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
