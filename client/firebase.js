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
            window.location.href = "#";
        } else if(token) {
            fb.auth.signInWithCustomToken(token);
        }

        fb.auth.onAuthStateChanged(function (user) {
            if (user) {
                let u = {
                    uid: user.uid,
                    displayName: user.email
                };
                 // Get user data
                 let userProm = fb.db.collection("Users").doc(user.uid).get().then((snapshot) => {
                    const dbUser = snapshot.exists && snapshot.data();
                    Object.keys(dbUser).forEach(key => {
                        u[key] = dbUser[key];
                    });
                    return Promise.resolve(true);
                });
                // Get authorized
                let authProm = fb.db.collection("Users").doc("authorized").get().then((snapshot) => {
                    u["authorized"] = snapshot.exists && snapshot.data()[u.uid];
                    return Promise.resolve(true);
                });
                // Get admin
                let adminProm = fb.db.collection("Users").doc("admin").get().then((snapshot) => {
                    u["admin"] = snapshot.exists && snapshot.data()[u.uid];
                    return Promise.resolve(true);
                });

                Promise.all([userProm, authProm, adminProm]).then( () => {
                    fb.user = u;
                    callback(u);
                }, (err) => {
                    console.log(err);
                    fb.user = u;
                    callback(u);
                });
                callback(user);
            } else {
                callback(null);
            }
        });
    },

    getToken: function (callback) {
        fb.auth.currentUser.getIdToken(true).then(callback);
    },

    showAuthPopup: function () {
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
        const unsub = ref.onSnapshot( snapshot => {
            if(!snapshot.exists) {
                throw new Error("No such doc");
            }
            let data = snapshot.data();
            if(data) {
                data['ref'] = ref;
                setDoc(data);
                setLoading(false);
            } else {
                setError(snapshot);
                setLoading(false);
            }
        }, err => {
            setError(err);
            setLoading(false);
        });
        return unsub;
    }, [path]);

    const updateDoc = (data) => {
        return fb.db.doc(path).update(data);
    }

    return [doc, loading, error, updateDoc];
};

const f = () => {};

export const useDelayedUpdate = (doc, updateDelayMs) => {
    let [docLocal, setDocLocal] = useState(doc);
    let [queuedUpdates, setQueuedUpdates] = useState({});
    let [updateTimeout, setUpdateTimeout] = useState(null);
    let [error, setError]  = useState(null);
    let [success, setSuccess]  = useState(null);

    useEffect( () => {
        setDocLocal(doc);
        return () => {
            // Clean up timer
            if(updateTimeout) {
                clearTimeout(updateTimeout);
            }
        }
    }, [doc, updateTimeout]);

    const updateDoc = (data) => {
        return doc.ref.update(data).then(() => {
            setSuccess(Object.keys(data).length);
        }, err => {
            setError(err);
        });
    }
    
    const updateDocDelayed = (data) => {
        console.log(data);
        if(updateTimeout) {
            clearTimeout(updateTimeout);
        }
        setError(null);
        setSuccess(null);

        let upd = queuedUpdates;
        let updDoc = docLocal;
        Object.keys(data).forEach(key => {
            upd[key] = data[key];
            updDoc[key] = data[key];
        });
        setQueuedUpdates(upd);
        setDocLocal(updDoc);

        setUpdateTimeout(
            setTimeout( () => {
                updateDoc(upd);
                setUpdateTimeout(null);
            }, updateDelayMs)
        );
    }

    return [docLocal, updateDocDelayed, updateTimeout !== null, success, error];

}

export const useDocDelayedUpdate = (path, updateDelayMs) => {
    let [doc, updateDoc, loading, error] = useDoc(path);

    let [docLocal, setDocLocal] = useState({});
    let [queuedUpdates, setQueuedUpdates] = useState({});
    let [updateTimeout, setUpdateTimeout] = useState(null);
    
    useEffect( () => {
        setDocLocal(doc);

        return () => {
            // Clean up timer
            if(updateTimeout) {
                clearTimeout(updateTimeout);
            }
        }
    }, [doc, updateTimeout]);
    
    const updateDocDelayed = (data) => {
        if(updateTimeout) {
            clearTimeout(updateTimeout);
        }

        let upd = queuedUpdates;
        let updDoc = docLocal;
        for(let key in Object.keys(data)) {
            upd[key] = data[key];
            updDoc[key] = data[key];
        }
        setDocLocal(upd);
        setQueuedUpdates(upd);

        setUpdateTimeout(
            setTimeout( () => {
                updateDoc(queuedUpdates);
                setUpdateTimeout(null);
            }, updateDelayMs)
        );
    }

    return [docLocal, updateDocDelayed, loading, error, updateTimeout !== null];

}

export const useCollection = (path, query=undefined) => {

    let [collection, setCollection] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect( () => {
        let ref = fb.db.collection(path);
        if(query && query.length == 3) {
            ref = ref.where(...query);
        }
        const unsub = ref.onSnapshot( snapshot => {
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
        return unsub;
    }, [path, query]);

    const addDoc = (data) => {
        return fb.db.collection(path).add(data);
    }

    return [collection, addDoc, loading, error];
};