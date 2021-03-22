import React, { Component, useState, useEffect, useReducer } from "react";
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
import emotionList3 from '../utils/emotionList3'


import { Select, InputLabel, TextField, MenuItem, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Home = () => {
  const history = useHistory()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [emotions, setEmotions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [primaryEmotion, setPrimaryEmotion] = useState('')
  const [secondaryEmotion, setSecondaryEmotion] = useState('')
  const [tertiaryEmotion, setTertiaryEmotion] = useState('')

  // const [state, setState] = useReducer(
  //   (state, newState) => ({...state, ...newState}),
  //   {loading: true, data: null, primaryEmotion: '', secondaryEmotion: '', tertiaryEmotion: ''}
  // )

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

  function stopHover(e) {
    e.target.style.color = 'black';
  }

  useEffect(() => {
    return getEmotions()
  }, [])

  return (
    <div className="App">
      <div id="header">Emotions</div>
      <div>
        <Link to="/login" style={{ marginRight: 16 }}> Go to Login</Link>
        <Button onClick={() => logout()} variant="contained" color="primary">Logout</Button>
        <div>
          <Button variant="outlined" color="primary" onClick={() => setModalOpen(true)}>Add Emotion </Button>
        </div>
      </div>
      <Input />
      <div id="input" style={{ marginTop: 16 }}>
        <input id="inputBox" type="text" onChange={(e) => setInputValue(e.target.value)} placeholder="Enter an emotion..." value={inputValue} />
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="dem0-simple-select-outlined-label">Emotion</InputLabel>
            <Select value={primaryEmotion} onChange={(e) => setPrimaryEmotion(e.target.value)} label="Emotion">
              {emotionList3.map((emotion) => {
                return <MenuItem value={emotion.name}>{emotion.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          {primaryEmotion && (
             <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="dem0-simple-select-outlined-label">Sub-Emotion</InputLabel>
            <Select value={secondaryEmotion} onChange={(e) => setSecondaryEmotion(e.target.value)} label="Secondary Emotion">
              {emotionList3.filter((emotion) => {
                return emotion.name === primaryEmotion;
              })[0].list.map((emotion2) => {
                return <MenuItem value={emotion2.name}>{emotion2.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          )}
          {primaryEmotion && secondaryEmotion && (
             <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="dem0-simple-select-outlined-label">Final-Emotion</InputLabel>
            <Select value={tertiaryEmotion} onChange={(e) => setTertiaryEmotion(e.target.value)} label="Tertiary Emotion">
              {emotionList3.filter((emotion) => {
                return emotion.name === primaryEmotion;
              })[0].list.filter((emotion2) => {
                return emotion2.name === secondaryEmotion
              })[0].list.map((emotion3) => {
                return <MenuItem value={emotion3.name}>{emotion3.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          )}
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