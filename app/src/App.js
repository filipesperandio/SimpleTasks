import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import TaskList from './TaskList';
import InputTask from './InputTask';

const Config = {
  title: "Simple Tasks"
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title={Config.title} />
        <TaskList list="default" />
        <InputTask />
      </div>
    );
  }
}

export default App;
