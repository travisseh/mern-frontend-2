import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Todos from "../Components/Todos";
import Input from "../Components/Input";
import config from "../config";
import '../App.css'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const  Home = () => {
  const history = useHistory()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [emotions, setEmotions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  console.log("emotions", emotions)

  const login = () => {
    console.log("hel")
    axios.get(`${config.backend}/auth/google`)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    history.push('/login')
  }

  const getEmotions = () => {
    axios.get(`${config.backend}/emotions`).then((res) => {
      if (res.data) {
        setEmotions(res.data);
      }
    });
  };
  const deleteEmotion = (emotionId) => {
    console.log("hello", emotionId)
    console.log(`${config.backend}/emotions/${emotionId}`)
    axios.delete(`${config.backend}/emotions/${emotionId}`)
      .then((res) => {
        console.log(res)
        if (res.data) {
          getEmotions();
        }
      })
      .catch((err) => console.log(err));
  };


  const addEmotion = () => {
    console.log("hello")
    const emotion = { emotion: inputValue };
    axios.post(`${config.backend}/emotions`, emotion).then((res) => {
      console.log(res, "res")
      if (res.data) {
        getEmotions();
        setInputValue('');
      }
    });
  };
  const onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

   function hover(e) {
      e.target.style.color = 'red'; 
  }

  function stopHover(e){
    e.target.style.color = 'black';
  }

  useEffect(() => {
    return getEmotions()
  },[])

    return (
      <div className="App">
        <div id="header">Emotions</div>
        <div>
        <Link to="/login" style={{marginRight: 16}}> Go to Login</Link>
        <Button onClick={() => logout()} variant="contained" color="primary">Logout</Button>
        <div>
          <Button variant="outlined" color="primary" onClick={() => setModalOpen(true)}>Add Emotion </Button>
        </div>
        </div>
        <Input/>
        <div id="input" style={{marginTop: 16}}>
        <input id="inputBox" type="text" onChange={(e)=> setInputValue(e.target.value)} placeholder="Enter an emotion..." value={inputValue} />
        <button onClick={() => addEmotion()} id="addTodo">Add Emotion</button>
      </div>
      {emotions.length > 0 && (
        <div>
          {emotions.map(emotion => {
            return <div onMouseOver={hover} onMouseOut={stopHover} onClick={() => deleteEmotion(emotion._id)}>{emotion.type}</div>
          })}
        </div>
      )}
     
        <Dialog fullScreen={fullScreen} open={modalOpen} onClose={() => setModalOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}

export default Home;