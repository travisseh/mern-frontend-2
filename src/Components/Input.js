import React, { Component } from "react";
import axios from "axios";
import config from '../config';

class Input extends Component {
  state = {
    input: "",
  };

  testAxios = () => {
    axios.post(`${config.backend}/test`, {test: "test"})
  }

  getEmotions = () => {
    axios.get(`${config.backend}/emotions`)
    .then((res)=> {
      console.log("response", res)
    })
  }

  addEmotion = () => {
    console.log("hello")
    const emotion = { emotion: this.state.input };
    axios.post(`${config.backend}/emotions`, emotion).then((res) => {
      console.log(res, "res")
      if (res.data) {
        this.props.getTodos();
        this.setState({
          input: "",
        });
      }
    });
  };
  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };
  render() {
    return (
      <div id="input" style={{marginTop: 16}}>
        <input id="inputBox" type="text" onChange={this.onChange} placeholder="Enter an emotion..." value={this.state.input} />
        <button onClick={this.addEmotion} id="addTodo">Add Emotion</button>
      </div>
    );
  }
}

export default Input;
