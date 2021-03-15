import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";




const Test = () => {
   let history = useHistory();
    function handleClick() {
    history.push("/login");
  }
  return (
    <div className="App">
      <button onClick={() => handleClick()}>Got to Home</button>
    </div>
  );
};

const App = () => {

  const checkAuth = () => localStorage.getItem('accessToken') ? <Home /> : <Login />

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {checkAuth()}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
    // <Router history={history}>
    //       <Route path="/" component={Test}  />
    //       <Route exact path="/home" component={<Home history={history}/>}  />
    // </Router>
  );
}

export default App;
