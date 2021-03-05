import React, { Component } from "react";
import axios from "axios";
import Todos from "./Components/Todos";
import Input from "./Components/Input";
import config from "./config";
import './App.css'

class App extends Component {
  state = {
    todos: [],
  };

  login = () => {
    console.log("hel")
    axios.post(`${config.backend}/auth/google`)
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
    return (
      <div className="App">
        <div id="header">My Todo List</div>
        <div>
          <button onClick={() => this.test()}>Login</button>
        </div>
        <Input getTodos={this.getTodos}/>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo}/>
      </div>
    );
  }
}

export default App;
