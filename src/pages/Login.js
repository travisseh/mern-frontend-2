import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import '../App.css'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
// import history from '../utils/history.js'
import { useHistory } from 'react-router-dom';


// const Wrapper = styled.div`
// 	background: #fff;
// 	height: 92vh;
// `;

// const ButtonContainer = styled.div`
// 	flex: 1;
// 	margin-top: 16px;
// `;

// const CustomButton = styled(Button)`
// 	height: 40px !important;
// 	display: flex !important;
// 	flex: 1;
// 	border: 1px solid rgba(16, 22, 26, 0.2) !important;
// 	box-sizing: border-box !important;
// 	border-radius: 3px !important;
// `;

const Login = (props) => {

  console.log("props", props)

const history = useHistory();

  const responseGoogleSuccess = (response) => {
  localStorage.setItem("accessToken", response.accessToken,);localStorage.setItem("user", response.profileObj,)
  axios.post(`${config.backend}/login`, {profile: response.profileObj}).then((res) => console.log("response", res))
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
        <div id="header">Login</div>
        <div>
        <div style={{marginBottom: 24}}>Log into Emotion Trainer</div>
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
        <Link to="/home"> Go to Home</Link>
        </div>
      </div>
    );

}

export default Login;