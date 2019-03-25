import React, {Component} from 'react';
import './App.css';
import ButtonAppBar from './ButtonAppBar';
import MainPageTB from './MainPageTB';

import fb from './firebase.js';
import EditContributionView from "./EditContributionView";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            contributions: [],
            showEditWindow: false
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
    }

    windowSwap() {
        this.setState({
            showEditWindow: !this.state.showEditWindow
        });
    }

    render() {
        let currentWindow = this.state.showEditWindow ? <EditContributionView windowSwap={this.windowSwap.bind(this)} /> :
                                                        <MainPageTB contributions={this.state.contributions}
                                                                    windowSwap={this.windowSwap.bind(this)}/> ;
        return (
            <div className="App">
                <ButtonAppBar/>
                {currentWindow}
            </div>
        );
    }
}

export default App;
