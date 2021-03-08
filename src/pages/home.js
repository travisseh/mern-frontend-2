import React, { Component } from "react";
import axios from "axios";
import Todos from "../Components/Todos";
import Input from "../Components/Input";
import config from "../config";
import '../App.css'

class Home extends Component {
  state = {
    todos: [],
  };

  login = () => {
    console.log("hel")
    axios.get(`${config.backend}/auth/google`)
  }

  logout = () => {
    const {history} = this.props;
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    history.push('/')
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
console.log(history, "history")
    return (
      <div className="App">
        <div id="header">My Todo List</div>
        <div>
          <button onClick={() => this.logout()}>Logout</button>
        </div>
        <Input getTodos={this.getTodos}/>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo}/>
      </div>
    );
  }
}

export default Home;