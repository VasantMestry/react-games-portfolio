import React from 'react';
import TodoList from './components/TodoList/TodoList.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Homepage from './components/HomePage/HomePage.js'
import Nav from './components/Nav/Nav.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/todo" exact component={TodoList} />
          <Route path="/githubsearch" exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
