import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Enable parcel hot module replacement in dev
if (module.hot) {
    module.hot.accept()
}

if(window.location.port === "3000") {
    ReactDOM.render(<p>-  Error: Use <a href="http://localhost:8080">localhost:8080</a> to route requests through express server in dev -</p>,
            document.getElementById('root'));
} else {
    ReactDOM.render(<App/>, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
