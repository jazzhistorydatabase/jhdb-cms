import React, {Component} from 'react';
import './App.css';
import ButtonAppBar from './ButtonAppBar';
import MainPageTB from './MainPageTB';
import EditContributionView from "./EditContributionView";

import fb from './firebase.js';
import Paper from "@material-ui/core/Paper";
import dbx from './dropbox.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            contributions: [],
            users: [],
            showEditWindow: false,
            selectedContribution: undefined
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

            fb.base.bindCollection(`Users`, {
                context: this,
                state: 'users',
                withRefs: true
            });
        }
    }

    handleUserSignOut() {
        if (!window.confirm("Sign out of " + this.state.user.displayName + "?")) {
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

        if (!dbx.app) {
            dbx.initialize();
        }
    }

    windowSwap(selectedContribution) {
        this.setState({
            selectedContribution: selectedContribution,
            showEditWindow: !this.state.showEditWindow
        });
    }

    render() {

        console.log("Trying to update user");
        if(this.state.user && this.state.user.uid) {
            let user = {
                uid: this.state.user.uid,
                name: this.state.user.displayName,
                email: this.state.user.email,
                displayPhoto: this.state.user.photoURL,
            };
            fb.base.addToCollection('Users', user, this.state.user.uid);
        }

        let currentWindow = this.state.showEditWindow ? <EditContributionView selectedContribution={this.state.selectedContribution}
                                                                              windowSwap={this.windowSwap.bind(this)} /> :
                                                        <MainPageTB contributions={this.state.contributions}
                                                                    windowSwap={this.windowSwap.bind(this)}/> ;
        
        const appContent = this.state.user ?
            (this.state.contributions.length > 0) ? (
                <div>
                    {currentWindow}
                </div>
            ) : (
                <h3>No contributions found - contact administrator to enable your account then refresh</h3>
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
