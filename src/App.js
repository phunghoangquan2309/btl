import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { useAuth } from './Context/AuthContext';
import Login from './LoginPage/Login';
import Register from './RegisterPage/Register';
import Introduction from './Introduction/Introduction';
import Home from './TodoWebapp/Home';

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
            >
              <Home />
            </PrivateRoute>
            <PublicRoute path="/register">
              <Register />
            </PublicRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Introduction/>
            </Route>
            <Redirect to="/" />
        </Switch>
      </Router>
    </div>
      );
}

      export default App;
