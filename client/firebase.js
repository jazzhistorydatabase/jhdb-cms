import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Rebase from 're-base'

import React, { useState, useEffect } from 'react';

import clientConfig from './client-creds.json';

const fb = {
    // Must be bound to component — ie call initialize.bind(this)(callback) from App.componentWillMount()
    initialize: function (callback) {
        var config = clientConfig.firebaseConfig;
        this.app = firebase.initializeApp(config);

        fb.db = firebase.firestore(this.app);
        fb.auth = firebase.auth();
        // Rebase is EOL, swap out with firebase hooks
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

    getToken: function (callback) {
        fb.auth.currentUser.getIdToken(true).then(callback);
    },

    showAuthPopup: function (providerName) {
        if(window.confirm("NOTICE:\n\nYou will be redirected to Dropbox to sign in - if you are signed in to a Dropbox account other than your JHDB-issued account, please press cancel and sign out before continuing. Alternatively, you can log into the contributor portal from a Private/Incognito window.", "NOTICE"))
            window.location.href = "/redirect";
    },

    signOut: function () {
        fb.auth.signOut();
        window.sessionStorage.removeItem("fbjwt");
    }


};

export default fb;

// Firebase hooks (replacing re-base)
export const useDoc = (path) => {

    let [doc, setDoc] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect( () => {
        const ref = fb.db.doc(path);
        ref.onSnapshot( snapshot => {
            let data = snapshot.data();
            if(data) {
                data['ref'] = ref;
                setTimeout(() => {
                    setDoc(data).then(() => { 
                        setLoading(false)
                    });
                }, 5000);
            } else {
                setError(snapshot);
                setLoading(false);
            }
        }, err => {
            setError(err);
            setLoading(false);
        });
    }, [path]);

    const updateDoc = (data) => {
        return fb.db.doc(path).update(data);
    }

    return [doc, updateDoc, loading, error];
};

export const useCollection = (path) => {

    let [collection, setCollection] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect( () => {
        const ref = fb.db.collection(path);
        ref.onSnapshot( snapshot => {
            if(!snapshot.empty) {
                const docs = snapshot.docs.map(docSnapshot => {
                    let doc = docSnapshot.data();
                    doc['ref'] = docSnapshot.ref;
                    return doc;
                });
                setCollection(docs);
                setLoading(false);
            } else {
                setError(snapshot);
                setLoading(false);
            }
        }, err => {
            setError(err);
            setLoading(false);
        });
    }, [path]);

    const addDoc = (data) => {
        return fb.db.collection(path).addDoc(data);
    }

    return [collection, addDoc, loading, error];
};