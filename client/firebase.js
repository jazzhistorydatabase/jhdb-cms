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

        let token = window.location.hash.substr(1) || window.sessionStorage.getItem("fbjwt");

        if(window.location.hash && token) {
            fb.auth.signInWithCustomToken(token);
            window.sessionStorage.setItem("fbjwt", token);
            window.location.href = "/";
        } else if(token) {
            fb.auth.signInWithCustomToken(token);
        }

        fb.auth.onAuthStateChanged(function (user) {
            if (user) {
                callback(user);
            } else {
                callback(null);
            }
        });
    },

    showAuthPopup: function (providerName) {
        // var provider = providerName == 'Microsoft' ? 
        //         new firebase.auth.OAuthProvider('microsoft.com') :
        //         new firebase.auth.GoogleAuthProvider();
        // let login = window.location.href;
        // login += login.endsWith("/") ? "redirect/" : "/redirect/";
        if(window.confirm("NOTICE:\n\nYou will be redirected to Dropbox to sign in - if you are signed in to a Dropbox account other than your JazzHistoryDatabase-issued account, please press cancel and sign out before continuing. Alternatively, you can log into the contributor portal from a Private/Incognito window.", "NOTICE"))
            window.location.href = "/redirect";
        // var provider = firebase.auth.OAuthProvider("dropbox.com");
        // this.auth.signInWithPopup(provider).then(function (result) {
        //     // User signed in!
        //     this.user = result.user;
        //     console.log(this.user);
        // }).catch(function (error) {
        //     // An error occurred
        // });
    },

    signOut: function () {
        fb.auth.signOut();
        window.sessionStorage.removeItem("fbjwt");
    }


}
export default fb;