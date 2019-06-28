import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Rebase from 're-base'

import clientConfig from './client-creds.json';

const fb = {
    // Must be bound to component — ie call initialize.bind(this)(callback) from App.componentWillMount()
    initialize: function (callback) {
        var config = clientConfig.firebaseConfig;
        this.app = firebase.initializeApp(config);

        fb.db = firebase.firestore(this.app);
        fb.auth = firebase.auth();
        fb.base = Rebase.createClass(fb.db);

        fb.auth.onAuthStateChanged(function (user) {
            if (user) {
                callback(user);
            } else {
                callback(null);
            }
        });
    },

    showAuthPopup: function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider).then(function (result) {
            // User signed in!
            this.user = result.user;
            console.log(this.user);
        }).catch(function (error) {
            // An error occurred
        });
    }


}
export default fb;