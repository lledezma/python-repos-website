import React, { Component } from 'react';
import './App.css'

import Routes from './components/Routes'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main id="app">
          <Routes/>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

