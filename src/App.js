import React, {Component} from 'react';
import './App.css';
import ButtonAppBar from './ButtonAppBar';
import MainPageTB from './MainPageTB';
import EditContributionView from "./EditContributionView";

import fb from './firebase.js';
import Paper from "@material-ui/core/Paper";
import dbx from './dropbox.js';
import AdminPage from "./AdminPage";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            contributions: [],
            showEditWindow: false,
            showAdminWindow: false,
            //showWindow: false,
            selectedContribution: undefined,
            adminPanel: undefined,
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
        // let currentWindow = this.state.showEditWindow ? <EditContributionView selectedContribution={this.state.selectedContribution}
        //                                                                       windowSwap={this.windowSwap.bind(this)} /> :
        //                                                 <MainPageTB contributions={this.state.contributions}
        //                                                             windowSwap={this.windowSwap.bind(this)}/>
        //  <AdminPage adminPanel={this.state.adminPanel}
        //      adminSwap={this.adminSwap.bind(this)} />
        //  ;
        let currentWindow = this.state.showAdminWindow ? 2 : this.state.showEditWindow ? 1 : 0;
        let x;

        switch (currentWindow) {
            case 1:
                x = <EditContributionView selectedContribution={this.state.selectedContribution}
                                             windowSwap={this.windowSwap.bind(this)}/>;
                                             break;
            case 2:
                x = <AdminPage adminPanel={this.state.adminPanel}
                                  adminSwap={this.adminSwap.bind(this)}/>;
                                  break;
            default:
                x = <MainPageTB contributions={this.state.contributions}
                                   windowSwap={this.windowSwap.bind(this)}
                                    adminSwap={this.adminSwap.bind(this)}/>;
        }
            return <div className="App">
                <ButtonAppBar user={this.state.user} handleSignOut={this.handleUserSignOut.bind(this)}/>
                {x}
            </div>;

        const appContent = this.state.user ? (
                    <div>
                        {currentWindow}
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
