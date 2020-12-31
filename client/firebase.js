import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Rebase from 're-base'
import isEqual from 'lodash.isequal'

import React, { useState, useEffect, useRef } from 'react';

import clientConfig from './client-creds.json';

const fb = {
    initialize: function (callback) {
        var config = clientConfig.firebaseConfig;
        this.app = firebase.initializeApp(config);

        fb.db = firebase.firestore(this.app);
        fb.auth = firebase.auth(this.app);
        // Rebase is EOL, swap out with firebase hooks
        fb.base = Rebase.createClass(fb.db);
        // Emulators
        // if (location.hostname === "localhost") {
        //     fb.db.useEmulator('http://localhost:8000/');
        //     fb.db.settings({
        //         host: 'localhost:8000',
        //         ssl: false
        //     });
        //     fb.auth.useEmulator('http://localhost:9099/');
        //     window.fb = fb;
        // }

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
    console.log(`useDoc(${path})`)
    let [doc, setDoc] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect( () => {
        console.log(`useDocEffect(${path})`)
        const ref = fb.db.doc(path);
        const unsub = ref.onSnapshot( snapshot => {
            console.log(`useDocSnapshot(${path})`)
            if(!snapshot.exists) {
                throw new Error("No such doc: " + path);
            }
            let data = snapshot.data();
            if(data) {
                // Check if there's a diff with local data
                let diff = false;
                if(!doc) {
                    // First pull is always a diff
                    console.log('doc is null, will update');
                    diff = true;
                } else {
                    Object.keys(data).forEach(key => {
                        if(data[key] !== doc[key]) {
                            console.log(`Key ${key} is different!`)
                            diff = true;
                        }
                    });
                }
                // If there is, update local data
                if(diff) {
                    data['ref'] = ref;
                    setDoc(data);
                    setLoading(false);
                } else {
                    console.log("No diff, won't update");
                }
            } else {
                setError(snapshot);
                setLoading(false);
            }
        }, err => {
            console.error(err);
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


export const useDelayedUpdate = (doc, updateDelayMs, onSuccess, onError) => {
    let [docLocal, setDocLocal] = useState(doc);
    let [queuedUpdates, setQueuedUpdates] = useState({});
    let [updateTimeout, setUpdateTimeout] = useState(null);
    let [isUpdating, setUpdating]  = useState(false);

    useEffect( () => {
        console.log(`delayedDocUpdated(${doc.ref.path})`)
        setDocLocal(doc);
        setUpdating(false);
    }, [doc]);

    useEffect( () => () => {
        // Clean up timer
        if(updateTimeout) {
            clearTimeout(updateTimeout);
        }
    }, [updateTimeout])

    const updateDoc = (data) => {
        return doc.ref.update(data).then(() => {
            onSuccess(Object.keys(data).length);
        }, err => {
            console.error(err);
            onError(err);
            setUpdating(false);
        });
    }
    
    const updateDocDelayed = (data) => {
        if(updateTimeout) {
            clearTimeout(updateTimeout);
        }

        let upd = queuedUpdates;
        let updDoc = docLocal;
        Object.keys(data).forEach(key => {
            upd[key] = data[key];
            updDoc[key] = data[key];
        });
        setQueuedUpdates(upd);
        setDocLocal(updDoc);
        setUpdating(true);

        setUpdateTimeout(
            setTimeout( () => {
                updateDoc(upd);
                setUpdateTimeout(null);
            }, updateDelayMs)
        );
    }

    return [docLocal, updateDocDelayed, isUpdating];

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

    console.log(`useColl(${path})`)

    let [collection, setCollection] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect( () => {
        console.log(`useCollEffect(${path} ${query})`)
        let ref = fb.db.collection(path);
        if(query && query.length == 3) {
            ref = ref.where(...query);
        }
        const unsub = ref.onSnapshot( snapshot => {
            console.log(`useCollSnapshot(${path})`)
            if(!snapshot.empty) {
                const docs = snapshot.docs.map(docSnapshot => {
                    let doc = docSnapshot.data();
                    doc['ref'] = docSnapshot.ref;
                    //  check for diff
                    return doc;
                });
                setCollection(docs);
                setLoading(false);
            } else {
                setCollection([]);
                setLoading(false);
            }
        }, err => {
            console.error(err);
            setError(err);
            setLoading(false);
        });
        return unsub;
    // query is not a dependency as conditional queries would cause an infinite loop
    }, [path]);

    const addDoc = (data) => {
        return fb.db.collection(path).add(data);
    }

    return [collection, addDoc, loading, error];
};