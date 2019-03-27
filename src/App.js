import React, {Component} from 'react';
import './App.css';
import ButtonAppBar from './ButtonAppBar';
import MainPageTB from './MainPageTB';

import fb from './firebase.js';
import dbx from './dropbox.js';

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
        if (user) {
            fb.base.bindCollection(`Contributions`, {
                context: this,
                state: 'contributions',
                withRefs: true
            });
        }
    }

    componentWillMount() {
        if (!fb.app) {
            fb.initialize(this.handleUserAuth.bind(this));
        }
        fb.base.bindCollection(`Contributions`, {
            context: this,
            state: 'contributions',
            withRefs: true
        });
        if (!dbx.app) {
            dbx.initialize();
            // TODO: find the right way to do this
            setTimeout(() => console.log(dbx.getAccessTokenFromUrl()), 10000);
        }
    }

    render() {
        return (
            <div className="App">
                <ButtonAppBar/>
                <h1>My Contributions</h1>
                <MainPageTB contributions={this.state.contributions}/>
            </div>
        );
    }
}

export default App;
