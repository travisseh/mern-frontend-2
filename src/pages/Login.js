import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import '../App.css'
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import history from '../utils/history.js'

class Login extends Component {
  state = {
    todos: [],
  };

  responseGoogleSuccess = (response) => {
    // const {history} = this.props
  localStorage.setItem("accessToken", response.accessToken,);localStorage.setItem("user", response.profileObj,)
  history.push('/home')
  }

  responseGoogleFail = (response) => {
  console.log("fail",response);
  }

  login = () => {
    console.log("hel")
    axios.get(`${config.backend}/auth/google`)
  }

  test = () => console.log("testststt")

  componentDidMount() {
    this.getTodos();
  }
  getTodos = () => {
    axios.get(`${config.backend}/api/todos`).then((res) => {
      if (res.data) {
        this.setState({ todos: res.data });
      }
    });
  };
  deleteTodo = (todo_id) => {
    axios.delete(`${config.backend}/api/todos/${todo_id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    const {history} = this.props;
    console.log(this.props)
    return (
      <div className="App">
        <div id="header">Login</div>
        <div>
        <GoogleLogin
    clientId="424231771518-2jbqp4946khki5j3b94pbb9ermuh6uel.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogleSuccess}
    onFailure={this.responseGoogleFail}
    cookiePolicy={'single_host_origin'}
  />,
          <button onClick={() => this.login()}>Login</button>
           <Link to="/home">Homeeee</Link>
        </div>
      </div>
    );
  }
}

export default Login;