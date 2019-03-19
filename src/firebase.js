import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Rebase from 're-base'

const fb = {

    // Must be bound to component
    initialize: function(callback) {
        var config = {
            apiKey: "AIzaSyBnkU1O4VkRUkbZS8LXuR7MYIBv2WQAupY",
            authDomain: "testproj-34045.firebaseapp.com",
            databaseURL: "https://testproj-34045.firebaseio.com",
            projectId: "testproj-34045",
            storageBucket: "testproj-34045.appspot.com",
            messagingSenderId: "461322757899"
        };
        this.app = firebase.initializeApp(config);

        fb.db = firebase.firestore(this.app);
        fb.auth = firebase.auth();
        fb.base = Rebase.createClass(fb.db);

        fb.auth.onAuthStateChanged(function(user) {
            if (user) {
                callback(user);
                // User is signed in.
                // console.log(user);
                // fb.user = {
                //   displayName: user.displayName,
                //   email: user.email,
                //   photoURL: user.photoURL,
                //   uid: user.uid,
                // }
            } else {
                callback(null);
                // fb.user = null;
            }
        });
    },


    showAuthPopup: function() {

        var provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider).then(function(result) {
            // User signed in!
            // this.user.uid = result.user.uid;
            this.user = result.user;
            console.log(this.user);
        }).catch(function(error) {
            // An error occurred
        });
    }




}
export default fb;