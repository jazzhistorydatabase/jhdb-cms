import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import fb from './firebase.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            contributions: [],
            selectedStory: null,
            selectedPage: null,
        }
    }

    handleUserAuth(user) {
        this.setState({user: user});
        if(user) {
            fb.base.bindCollection(`Contributions`, {
                context: this,
                state: 'contributions',
                withRefs: true
            });
        }
    }

    componentWillMount() {
        if(!fb.app) {
            fb.initialize(this.handleUserAuth.bind(this));
        }
        fb.base.bindCollection(`Contributions`, {
            context: this,
            state: 'contributions',
            withRefs: true
        });
    }

  render() {

    console.log(this.state.contributions);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
