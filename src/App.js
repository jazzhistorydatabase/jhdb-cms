import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import MainPageTB from './mainPageTB';

class App extends Component {

  render() {
    let contribs = {
      a: {
        name: "A",

      },
      b: {
        name: "B",
      },
      c: {
        name: "C",
      },
    };

    return (
      <div className="App">
        <Header
        />
      <h1>Hello</h1>
        <MainPageTB contributions={contribs}
          />
      </div>
    );
  }
}

export default App;
