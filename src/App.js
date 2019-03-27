import React, {Component} from 'react';
import './App.css';
import ButtonAppBar from './ButtonAppBar';
import MainPageTB from './MainPageTB';

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
        if (user) {
            fb.base.bindCollection(`Contributions`, {
                context: this,
                state: 'contributions',
                withRefs: true
            });
        }
    }

    handleUserSignOut() {
        if(!window.confirm("Sign out of " + this.state.user.displayName + "?")) {
            return;
        }
        this.setState({user: null});
        fb.auth.signOut();
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
    }

    render() {
        const appContent = this.state.user ? (
            <div>
                <h1>My Contributions</h1>
                <MainPageTB contributions={this.state.contributions}/>
            </div>
        ) : (
          <h3>Sign in to continue</h3>
        );
        return (
            <div className="App">
                <ButtonAppBar user={this.state.user} handleSignOut={this.handleUserSignOut.bind(this)}/>
                {appContent}
            </div>
        );
    }
}

export default App;
