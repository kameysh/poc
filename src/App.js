import React from 'react';
import HomePage from "./components/HomePage/HomePage";
import SignupPage from "./components/SignupPage/SignupPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/profile' component={ProfilePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
