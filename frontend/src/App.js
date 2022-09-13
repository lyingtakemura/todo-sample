import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    axios
    .get('http://127.0.0.1:8000/api/v1/todos/')
    .then(response => {
      this.setState({ todos: response.data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleCheckClick(checked) {
    // console.log(checked)
    axios.patch('http://127.0.0.1:8000/api/v1/todos/' + checked.id + '/',
      {
        "done": !checked.done
      },
    )
    .then((response) => {
      this.getTodos()
        // const todos = this.state.todos.map((item) => {
        //   if (item.id === checked.id) {
        //     const updatedItem = {
        //       ...item,
        //       done: !item.done,
        //     };
    
        //     return updatedItem;
        //   }
    
        //   return item;
        // });
    
        // this.setState({ todos: todos });
    })
    .catch((error) => {
      console.log(error)
    })
  }


  render() {
    return (
      <div>
      {this.state.todos.map(item => (
        <div className={`flex font-semibold bg-slate-300 antialiased w-1/3 mx-auto my-1 border-2 p-4 border-slate-400 rounded-md ${item.done ? 'border-green-400' : 'border-slate-400'} `} key={item.id}>
          <div className='w-3/4 inline-block align-middle'>{item.title}</div>
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
