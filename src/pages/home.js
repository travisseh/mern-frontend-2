import React, { Component, useState, useEffect, useReducer } from "react";
import axios from "axios";
import config from "../config";
import '../App.css'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import emotionList3 from '../utils/emotionList3';
import {capitalize} from '../utils/functions';


import { Select, InputLabel, TextField, MenuItem, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, RadioGroup, Radio, FormControlLabel, Card, CardActions, CardContent, Typography, Box, FormHelperText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "inline-block",
  },
  card: {
    minWidth: 275,
    maxWidth: 500,
    marginTop: 16,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  pos: {
    marginBottom: 8,
  },
}));

const Home = () => {
  const history = useHistory()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loading: true, data: null, primaryEmotion: '', secondaryEmotion: '', tertiaryEmotion: '', belief: '', beliefType: '', action: '', tellPart: '', selectedEmotion: '', modalOpen: false, emotions: [] }
  )

  const login = () => {
    console.log("hel")
    axios.get(`${config.backend}/auth/google`)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    history.push('/')
    window.location.reload(false)
  }

  const getEmotions = async () => {
    const userId = await localStorage.getItem('_id')
    console.log("userId from local", userId)
    axios.get(`${config.backend}/emotions?userId=${userId}`).then((res) => {
      if (res.data) {
        console.log("response", res.data)
        setState({ emotions: res.data });
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


  const addEmotion = async () => {
    console.log("hello")
    const userId = await localStorage.getItem('_id')
    const emotion = {
      selectedEmotion: state.selectedEmotion,
      primaryEmotion: state.primaryEmotion,
      secondaryEmotion: state.secondaryEmotion,
      tertiaryEmotion: state.tertiaryEmotion,
      tellPart: state.tellPart,
      beliefType: state.beliefType,
      belief: state.belief,
      action: state.action,
      userId: userId,
    };
    axios.post(`${config.backend}/emotions`, emotion).then((res) => {
      console.log(res, "res")
      if (res.data) {
        getEmotions();
        setState({ selectedEmotion: '', primaryEmotion: '', secondaryEmotion: '', tertiaryEmotion: '', belief: '', beliefType: '', tellPart: '', action: '', modalOpen: false });
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
        <Button onClick={() => logout()} variant="contained" color="primary" style={{marginTop: 16}}>Logout</Button>
        <div>
          <Button variant="outlined" color="primary" onClick={() => setState({ modalOpen: true })} style={{ marginTop: 16 }} >Add Emotion </Button>
        </div>
      </div>
      {state.emotions.length > 0 ? (
        <Box m="auto" className={classes.box}>
          {state.emotions.map(emotion => {
            return (
              
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography className={classes.pos} color="textSecondary" gutterBottom>
                    {emotion.selectedEmotion}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary">
                    {capitalize(emotion.beliefType)}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {emotion.belief}
                  </Typography>
                  <Typography variant="body2" component="p" style={{marginTop: 8}}>
                    {emotion.beliefType === "authentic" ? emotion.action : emotion.tellPart}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      ): (<div style={{marginTop: 24}}>Add an emotion to get started!</div>)}

      <Dialog fullScreen={fullScreen} open={state.modalOpen} onClose={() => setState({ modalOpen: false })} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Emotion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the fields below as honestly and accurately as possible.
          </DialogContentText>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="dem0-simple-select-outlined-label">Emotion</InputLabel>
            <Select value={state.primaryEmotion} onChange={(e) => setState({ primaryEmotion: e.target.value, secondaryEmotion: '', tertiaryEmotion: '', selectedEmotion: e.target.value })} label="Emotion">
              {emotionList3.map((emotion) => {
                return <MenuItem value={emotion.name}>{emotion.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          {state.primaryEmotion && (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="dem0-simple-select-outlined-label">Sub-Emotion</InputLabel>
              <Select value={state.secondaryEmotion} onChange={(e) => setState({ secondaryEmotion: e.target.value, tertiaryEmotion: '', selectedEmotion: e.target.value })} label="Secondary Emotion">
                {emotionList3.filter((emotion) => {
                  return emotion.name === state.primaryEmotion;
                })[0].list.map((emotion2) => {
                  return <MenuItem value={emotion2.name}>{emotion2.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          )}
          {state.primaryEmotion && state.secondaryEmotion && (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="dem0-simple-select-outlined-label">Final-Emotion</InputLabel>
              <Select value={state.tertiaryEmotion} onChange={(e) => setState({ tertiaryEmotion: e.target.value, selectedEmotion: e.target.value })} label="Tertiary Emotion">
                {emotionList3.filter((emotion) => {
                  return emotion.name === state.primaryEmotion;
                })[0].list.filter((emotion2) => {
                  return emotion2.name === state.secondaryEmotion
                })[0].list.map((emotion3) => {
                  return <MenuItem value={emotion3.name}>{emotion3.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          )}
          <TextField
            margin="dense"
            id="name"
            label="Belief Behind the Emotion"
            // type="email"
            variant="outlined"
            fullWidth
            value={state.belief}
            onChange={(e) => setState({ belief: e.target.value })}
          />
          <div style={{ marginTop: 16 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Where Belief Comes From</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={state.beliefType} onChange={(e) => setState({ beliefType: e.target.value })}>
                <FormControlLabel value="part" control={<Radio />} label="Part" />
                <FormControlLabel value="authentic" control={<Radio />} label="Authentic Self" />
              </RadioGroup>
              <FormHelperText>The authentic self sounds calm, capable, and honest. It is truth. Parts sound shouty, mean, and unreasonable. They are false or half-truths.</FormHelperText>
            </FormControl>
          </div>
          <div>
            {state.beliefType && state.beliefType === "part" && (
              <TextField
                margin="dense"
                id="name"
                label="What Can You Tell the Part"
                // type="email"
                variant="outlined"
                fullWidth
                style={{ marginTop: 16 }}
                value={state.tellPart}
                onChange={(e) => setState({ tellPart: e.target.value })}
              />
            )}
            {state.beliefType && state.beliefType === "authentic" && (
              <TextField
                margin="dense"
                id="name"
                label="What Action Can You Take"
                // type="email"
                variant="outlined"
                fullWidth
                style={{ marginTop: 16 }}
                value={state.action}
                onChange={(e) => setState({ action: e.target.value })}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState({ modalOpen: false })} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addEmotion()} color="primary">
            Save Emotion
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;