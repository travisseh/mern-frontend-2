import React, { Component } from "react";

class Todos extends Component {
  render() {
    return (
      <div id="todos">
        {this.props.todos.map((todo) => {
          return (
            <div key={todo._id} className="todo">
              <div className="task">{todo.task}</div>
              <button className="deleteTodo" onClick={() => this.props.deleteTodo(todo._id)}> X </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Todos;
