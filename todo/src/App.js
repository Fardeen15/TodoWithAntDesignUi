import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TodoForm from './component/todoform';
import Items from './component/todoitems';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      edit: false,
      key1: "",
      data: ""
    }
  }
  edit = (ev, key, data) => {
    // console.log(,)
    this.setState({
      edit: true,
      data: data[ev.target.name],
      key1: key[ev.target.name]
    })
  }
  empty = () => {
    this.setState({
      edit: false,
      data: "",
      key1: ""
    })
  }
  render() {

    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={() => <TodoForm empty={this.empty} data={this.state.data} edit={this.state.edit} key1={this.state.key1} />} />
          <Route path="/List" component={() => <Items edit={this.edit} />} />
        </Router>
      </div>
    );
  }
}

export default App;
