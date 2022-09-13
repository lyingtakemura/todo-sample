import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
    input: ''
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    axios
    .get('http://127.0.0.1:8000/api/v1/todos/')
    .then(response => {
      this.setState({
        todos: response.data
      })
    })
    .catch(error => {
      console.log(error)
    });
  }

  handleCheckbox(obj) {
    axios.patch('http://127.0.0.1:8000/api/v1/todos/' + obj.id + '/',
      {
        "done": !obj.done
      },
    )
    .then((response) => {
      this.getTodos()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/api/v1/todos/", {
      title: this.state.input,
    }).then(() => {
      this.setState({
        input: ""
      })
      this.getTodos()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleInput(event) {
    this.setState({
      input: event.target.value
    })
  }

  handleDelete(obj) {
    axios.delete(
      'http://127.0.0.1:8000/api/v1/todos/' + obj.id + '/'
    ).then(() => {
      this.getTodos()
    })
  }

  render() {
    return (
      <div className='font-semibold antialiased'>
        <form onSubmit={this.handleSubmit.bind(this)} className='bg-slate-300 w-1/3 mx-auto my-1 rounded-md'>
          <input type="text" required placeholder='TODO' value={this.state.input} onChange={this.handleInput.bind(this)} className='w-5/6 border-2 p-4 border-slate-400 rounded-md' />
          <input type="submit" value="ADD" className='border-2 p-4 border-slate-400 rounded-md w-1/6 hover:bg-green-400' />
        </form>
        {this.state.todos.map(item => (
        <div className={`flex bg-slate-300 antialiased w-1/3 mx-auto my-1 border-2 p-4 border-slate-400 rounded-md ${item.done ? 'border-green-400' : 'border-slate-400'} `} key={item.id}>
          <div className='w-3/4'>
            {item.title} <span onClick={this.handleDelete.bind(this, item)} className='text-xs hover:text-red-500'>(DELETE)</span></div>
          <span className='w-1/4 flex justify-end '>
            <input type="checkbox" onChange={this.handleCheckbox.bind(this, item)} defaultChecked={item.done} />
          </span>
        </div>
        ))}
      </div>
      );
    }
  }

export default App;
