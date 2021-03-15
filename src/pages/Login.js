import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import '../App.css'
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';
// import history from '../utils/history.js'
import { useHistory } from 'react-router-dom';


const Login = (props) => {

  console.log("props", props)

const history = useHistory();

  const responseGoogleSuccess = (response) => {
    // const {history} = this.props
  localStorage.setItem("accessToken", response.accessToken,);localStorage.setItem("user", response.profileObj,)
  history.push('/home')
  }

  const responseGoogleFail = (response) => {
  console.log("fail",response);
  }

  const login = () => {
    console.log("hel")
    axios.get(`${config.backend}/auth/google`)
  }


    return (
      <div className="App">
        <div id="header">Login</div>
        <div>
        <GoogleLogin
    clientId="424231771518-2jbqp4946khki5j3b94pbb9ermuh6uel.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleFail}
    cookiePolicy={'single_host_origin'}
  />,
          <button onClick={() => login()}>Login</button>
           <Link to="/home">Homeeee</Link>
        </div>
      </div>
    );

}

export default Login;