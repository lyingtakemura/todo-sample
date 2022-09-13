import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      input: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleCheckClick(checked) {
    axios.patch('http://127.0.0.1:8000/api/v1/todos/' + checked.id + '/',
      {
        "done": !checked.done
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

  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      input: event.target.value
    })
  }

  render() {
    return (
      <div className='font-semibold antialiased'>
        <form onSubmit={this.handleSubmit} className='bg-slate-300 w-1/3 mx-auto my-1 rounded-md'>
          <input type="text" required placeholder='TODO' value={this.state.input} onChange={this.handleChange} className='w-5/6 border-2 p-4 border-slate-400 rounded-md' />
          <input type="submit" value="ADD" className='border-2 p-4 border-slate-400 rounded-md w-1/6 hover:bg-green-400' />
        </form>
        {this.state.todos.map(item => (
        <div className={`flex bg-slate-300 antialiased w-1/3 mx-auto my-1 border-2 p-4 border-slate-400 rounded-md ${item.done ? 'border-green-400' : 'border-slate-400'} `} key={item.id}>
          <div className='w-3/4'>{item.title}</div>
          <span className='w-1/4 flex justify-end '>
            <input type="checkbox" className={``} onChange={() => this.handleCheckClick(item)} defaultChecked={item.done} />
          </span>
        </div>
        ))}
      </div>
      );
    }
  }

export default App;
