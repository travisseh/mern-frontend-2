import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

class App extends Component {

  checkAuth = () => localStorage.getItem('accessToken') ? <Home/> : <Login/>

  render() {
    return (
      <Router history={history}>

          <Switch>
            <Route path="/" component={() => this.checkAuth()} history={history} />
            <Route exact path="/home" component={Home} history={history} />
          </Switch>

      </Router>
    );
  }
}

export default App;
