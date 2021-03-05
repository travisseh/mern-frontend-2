import React, { Component } from "react";
import axios from "axios";
import config from '../config';

class Input extends Component {
  state = {
    input: "",
  };
  addTodo = () => {
    console.log("hello")
    const task = { task: this.state.input };
    axios.post(`${config.backend}/api/todos`, task).then((res) => {
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
      <div id="input">
        <input id="inputBox" type="text" onChange={this.onChange} placeholder="Enter a todo..." value={this.state.input} />
        <button onClick={this.addTodo} id="addTodo">Add Todo</button>
      </div>
    );
  }
}

export default Input;
