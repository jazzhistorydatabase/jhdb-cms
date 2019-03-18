import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import MainPageTB from './mainPageTB';

class App extends Component {

  render() {
    let contribs = {
      a: {
        name: "Contribution Name A",
        status: "Published",

      },
      b: {
        name: "Contribution Name B",
        status: "Published",
      },
      c: {
        name: "Contribution Name C",
        status: "Pending Review",
      },
      d: {
        name: "Contribution Name D",
        status: "Draft",
      }
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
