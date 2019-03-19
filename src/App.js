import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import MainPageTB from './mainPageTB';

import fb from './firebase.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            contributions: [],
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
        <Header
        />
      <h1>Hello</h1>
        <MainPageTB contributions={this.state.contributions}
          />
      </div>
    );
  }
}

export default App;
