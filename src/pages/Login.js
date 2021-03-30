import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import '../App.css'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
// import history from '../utils/history.js'
import { useHistory } from 'react-router-dom';



const Login = (props) => {

  console.log("props", props)

const history = useHistory();

  const responseGoogleSuccess = (response) => {
    console.log("hello",response.profileObj)
  localStorage.setItem("accessToken", response.accessToken,);localStorage.setItem("user", response.profileObj,)
  localStorage.setItem("userId", response.profileObj.googleId,)
  axios.post(`${config.backend}/login`, {profile: response.profileObj}).then((res) => localStorage.setItem("_id", res.data._id))
  history.push('/home')
  }

  const responseGoogleFail = (response) => {
  console.log("fail",response);
  }

  const login = () => {
    console.log("hel")
    axios.post(`${config.backend}/test`, {test: "test"})
  }


    return (
      <div className="App">
        <div id="header">Emotion Trainer</div>
        <div>
        <div style={{marginBottom: 24, marginTop: 16}}>Learn to manage your strong emotions in a healthy way</div>
        <GoogleLogin
    clientId="424231771518-2jbqp4946khki5j3b94pbb9ermuh6uel.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleFail}
    cookiePolicy={'single_host_origin'}
    icon={false}
  />
  
          
        </div>
        <div style={{marginTop: 16}}>
        </div>
      </div>
    );

}

export default Login;