import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Todos from "../Components/Todos";
import Input from "../Components/Input";
import config from "../config";
import '../App.css'
import { useHistory } from "react-router-dom";

const  Home = () => {
  const history = useHistory()

  const [todos, setTodos] = useState([])

  const login = () => {
    console.log("hel")
    axios.get(`${config.backend}/auth/google`)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    history.push('/login')
  }

  const getTodos = () => {
    axios.get(`${config.backend}/api/todos`).then((res) => {
      if (res.data) {
        this.setState({ todos: res.data });
      }
    });
  };
  const deleteTodo = (todo_id) => {
    axios.delete(`${config.backend}/api/todos/${todo_id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    return getTodos()
  },[])

    return (
      <div className="App">
        <div id="header">My Todo List</div>
        <div>
          <button onClick={() => logout()}>Logout</button>
        </div>
        <Input getTodos={() => getTodos()}/>
        
      </div>
    );
}

export default Home;