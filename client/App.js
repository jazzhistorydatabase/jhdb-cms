import React, { Component } from 'react';
import AdminView from "./AdminView";
import './App.css';
import Header from './Header';
import dbx from './dropbox.js';
import EditContributionView from "./EditContributionView";
import fb from './firebase.js';
import ContributionsListView from './ContributionsListView';
import { CircularProgress } from '@material-ui/core';
import { ArrowUpwardSharp } from '@material-ui/icons';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            contributions: [],
            users: [],
            showEditWindow: false,
            showAdminWindow: false,
            selectedContribution: undefined,
            adminPanel: undefined,
            pageLoadDone: false,
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
                withRefs: true,
                then: () => {
                    // Get authorized
                    fb.db.collection("Users").doc("authorized").get().then((snapshot) => {
                        let u = this.state.user;
                        u["authorized"] = snapshot.exists && snapshot.data()[u.uid];
                        console.log(snapshot.data());
                        this.setState({user: u});
                    });
                    // Get admin
                    fb.db.collection("Users").doc("admin").get().then((snapshot) => {
                        let u = this.state.user;
                        u["admin"] = snapshot.exists && snapshot.data()[u.uid];
                        this.setState({user: u});
                    });
                    
                }
            });
            if (!dbx.app) {
                dbx.initialize();
            }
        }
    }

    handleUserSignOut() {
        if (!window.confirm("Sign out of " + this.state.user.displayName + "?")) {
            return;
        }
        this.setState({user: null});
        fb.signOut();
    }

    componentWillMount() {
        if (!fb.app) {
            fb.initialize(this.handleUserAuth.bind(this));
        }
        setTimeout(() => {
            this.setState({pageLoadDone: true});
        }, 5000);

    }

    windowSwap(selectedContribution) {
        this.setState({
            selectedContribution: selectedContribution,
            showEditWindow: !this.state.showEditWindow
            //showWindow: !this.state.showWindow
        });
    }

    adminSwap() {
        this.setState({
            //adminPanel: adminPanel,
            showAdminWindow: !this.state.showAdminWindow
            //showWindow: !this.state.showWindow
        });
    }



    render() {

        let currentWindow = this.state.showAdminWindow ? 2 : this.state.showEditWindow ? 1 : 0;
        let x;

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

        switch (currentWindow) {
            case 1:
                x = <EditContributionView selectedContribution={this.state.selectedContribution}
                                             windowSwap={this.windowSwap.bind(this)}/>;
                                             break;
            case 2:
                x = <AdminView adminPanel={this.state.adminPanel}
                               users={this.state.users}
                                  adminSwap={this.adminSwap.bind(this)}/>;
                                  break;
            default:
                x = <ContributionsListView contributions={this.state.contributions}
                                   windowSwap={this.windowSwap.bind(this)}
                                    adminSwap={this.adminSwap.bind(this)}/>;
        }
            

        const appContent = this.state.user ?
            (this.state.user.authorized) ? (
                <div>
                    {x}
                </div>
            ) : (
                <div>
                    {(this.state.pageLoadDone ? 
                        <h3>This account is not enabled. Click the help button at the top right of this page for assistance</h3>   
                        : 
                        <h3><CircularProgress /><br/>Attempting to fetch collections...</h3>)}
                </div>
            ) : (
                <h3 style={{textAlign: 'left', paddingLeft: 20}}>
                    <ArrowUpwardSharp/><ArrowUpwardSharp/><ArrowUpwardSharp/>
                    <br/>
                    Please sign in to continue
                    <h5 style={{display: this.state.pageLoadDone ? 'none' : 'block'}}>
                        If you have just signed in, give it a few seconds...
                    </h5>
                </h3>
        );

        return (
            <div className="App">
                <Header user={this.state.user} 
                        handleSignOut={this.handleUserSignOut.bind(this)}
                        adminSwap={this.adminSwap.bind(this)}
                        adminButton={this.state.user && this.state.user.admin}
                        content={appContent}/>
            </div>
        );
    }
}

export default App;
