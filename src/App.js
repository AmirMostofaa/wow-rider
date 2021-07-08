import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import SignUp from './components/SignUp/SignUp';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';




export const UserContext = createContext()



function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div className="wow">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        
      <Router>
        <Header/>
        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/home">
            <Home/>
          </Route>

          <PrivateRoute path="/rider/:riderId">
            <Destination/>
          </PrivateRoute>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/signUp">
            <SignUp/>
          </Route>

          <Route path="/blog">
            <Blog/>
          </Route>

          <Route path="/contact">
            <Contact/>
          </Route>

        </Switch>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
