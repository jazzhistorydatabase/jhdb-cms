const express = require('express');
const exphbs  = require('express-handlebars');
const fb = require("firebase-admin");
const fs = require("fs");
const path = require('path');
const fetch = require('isomorphic-fetch');
const dropbox = require('dropbox');

const logger = require('./logger');

const serverCredentials = require("./server-creds.json");
const serviceAccount = serverCredentials.firebaseConfig;
const dropboxKey = serverCredentials.dropboxConfig.appKey;
const dropboxSecret = serverCredentials.dropboxConfig.appSecret;
const dropboxToken = serverCredentials.dropboxConfig.token;

const credentials = {
    client: {
      id: dropboxKey,
      secret: dropboxSecret
    },
    auth: {
      tokenHost: 'https://api.dropbox.com',
      tokenPath: '1/oauth2/token',
      authorizeHost: 'https://www.dropbox.com',
      authorizePath: '1/oauth2/authorize'
    }
  
  };
  const oauth2 = require('simple-oauth2').create(credentials);

fb.initializeApp({
    credential: fb.credential.cert(serviceAccount),
    databaseURL: "https://" + serviceAccount.project_id + "firebaseio.com"
});

const dbx = new dropbox.Dropbox({
    "clientId": dropboxKey, 
    "clientSecret": dropboxSecret, 
    "accessToken": dropboxToken,
    "fetch": fetch
});

const app = express();

// Configure handlebars
app.engine("handlebars", exphbs({defaultLayout: "template"}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

// Define function to pull contribution from firebase and render with handlebars
let renderFromFirebase = (req, res, collectionName, collectionId="") => {
    let collsRef;
    const collRoot = fb.firestore().collection("Contributions");
    let collName = collectionName.toLowerCase().replace(/-/g, " ")
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");

    if(collectionId) {
        logger.info(`Fetching collection by id: ${collectionId}`)
        collsRef = collRoot.doc(collectionId);
    } else {
        logger.info(`Fetching collection by name: "${collectionName}" -> "${collName}"`)
        collsRef = collRoot.where("name", "==", collName);
    }

    collsRef.get().then(snapshots => {
        if(!collectionId && snapshots.empty) {
            // No such collection
            logger.error(`No matching collections found for name: ${collectionName} id: ${collectionId}`);
            res.send("No matching collections found");
            return;
        } else {
            let snap = collectionId ?  [snapshots] : snapshots;
            logger.log(`Found ${snapshots.size} matches for name: ${collectionName} id: ${collectionId}`);
            snap.forEach(collRef => {
                let collectionDoc = collRef.data();


                console.log(collRef);

                let images = [];
                collRef.ref.collection("Images").get().then( imgSnapshot => {
                    imgSnapshot.forEach(doc => {
                        images.push(doc.data());
                    });
                    let audio = [];
                    collRef.ref.collection("Audio").get().then( audioSnapshot => {
                        audioSnapshot.forEach(doc => {
                            audio.push(doc.data());
                        });

                        let video = [];
                        collRef.ref.collection("Video").get().then( videoSnapshot => {
                            videoSnapshot.forEach(doc => {
                                let data = doc.data();
                                data.url = "https://www.youtube.com/embed/" + data.url.split("/")[3];
                                video.push(data);
                            });

                            logger.log(`Rendering preview template with name: ${collectionName} found doc id: ${collRef.id}`);

                            collectionDoc.shortDescription = collectionDoc && collectionDoc.description && collectionDoc.description.substr(200);

                            collectionDoc.images = images;
                            collectionDoc.audio = audio;
                            collectionDoc.video = video;
                            res.render("preview", collectionDoc);
                            logger.success(`Successfully rendered preview template with name: ${collectionName} doc id: ${collRef.id}`);
                            return;
                        }).catch( err => {
                            logger.error(`Error fetching video for name: ${collectionName} id: ${collectionId}`, err);
                            res.render("preview", collectionDoc);
                        });
                    }).catch( err => {
                        logger.error(`Error fetching audio for name: ${collectionName} id: ${collectionId}`, err);
                        res.render("preview", collectionDoc);
                    });
                }).catch( err => {
                    logger.error(`Error fetching images for name: ${collectionName} id: ${collectionId}`, err);
                    res.render("preview", collectionDoc);
                });

            })
        }
    }).catch( err => {
        logger.error(`Error fetching collection by name "${collectionName}" or id "${collectionId}"`, err);
    });
};

let previewReqHandler = (req, res) => {
    let collName = req.params.collection.toLowerCase();
    logger.info(`User request preview for collection: ${collName}`);
    return renderFromFirebase(req, res, collName);
}

app.get("/preview/header-new.html", (req, res) => {
    logger.info('User request preview/header-new.html');
    res.sendFile("./templates/header-new.html", {root: __dirname});
});

app.get("/preview/home", (req, res) => {
    logger.info('User request preview/home');
    res.sendFile("./templates/CMS-landing-page.html", {root: __dirname});
});

app.get("/preview/branch", (req, res) => {
    logger.info('User request preview/branch');
    res.sendFile("./templates/landing-page.html", {root: __dirname});
});

app.get("/preview/:collection", previewReqHandler);

app.get("/upload", (req, res) => {
    logger.info('User requesting upload link. Validating token...');
    let token = req.query["auth"];
    fb.auth().verifyIdToken(token).then(decodedToken => {
        logger.success(`Successfully validated token for user account_id: ${decodedToken.account_id} name: ${decodedToken.name}`)
        let path = "/jhdb global/"+decodedToken.name.toLowerCase();
        logger.log(`Generating upload link for account_id: ${decodedToken.account_id} path: ${path}`);
        dbx.filesGetTemporaryUploadLink({commit_info: {path: path}}).then( (dat => {
            logger.success(`Successfully sent upload link for account_id: ${decodedToken.account_id} path: ${path}`);
            res.send(dat && dat.link);
        })).catch(err => {
            logger.error(`Failed to generate upload link for account_id: ${decodedToken.account_id} path: ${path}`, err);
            res.send(err);
        });
    }).catch(err => {
        logger.err('Error authenticating user token for upload request', err);
        res.sendStatus(400);
    });
});




// Login

let apiUrl = (req, suffix) => {
    let stem = `${req.protocol}://${req.get('host')}`;
    return `${stem}${suffix}`;
}

let callbackUri = (req) => {
    return apiUrl(req, '/login/');
}

let createFirebaseAccount = (dropboxID, user) => {
    // The UID we'll assign to the user.
    // const uid = `dropbox:${dropboxID}`;
  
    let userData = {
        uid: dropboxID,
        email: (user.email || "No Email"),
        displayName: ((user.name && user.name.display_name) || "Contributor"),
        photoURL: user["profile_photo_url"] || undefined,
    };

    logger.log(`Fetch or create user id: ${dropboxID}`)
    
    // Create or update the user account.
    return fb.auth().updateUser(dropboxID, userData).then( () => {
        logger.success(`Successfully updated firebase user for id: ${dropboxID}, generating firebase token`);
        return fb.auth().createCustomToken(dropboxID);
    }).catch(err => {
        logger.log(`No such firebase user for id: ${dropboxID}, creating one`)
        fb.auth().createUser(userData).then( () => {
            logger.success(`Created new firebase user for id: ${dropboxID}, generating firebase token`)
            return fb.auth().createCustomToken(dropboxID);
        }).catch(err => {
            logger.error(`Error creating new firebase user for id: ${dropboxID}, attempting to generate firebase token anyway`);
            return fb.auth().createCustomToken(dropboxID);
        });
    });
};

app.get('/redirect', (req, res) => {
    const redirectUri = callbackUri(req);
    logger.info(`Beginning OAuth Code Flow redirect, redirect_uri: ${redirectUri}`);
    const redir = oauth2.authorizationCode.authorizeURL({
      redirect_uri: callbackUri(req),
    });
    res.redirect(redir);
});

app.get("/login", (req, res) => {
    const redirectUri = callbackUri(req);
    logger.info(`Fetching token from code, redirect_uri: ${redirectUri}`)
    oauth2.authorizationCode.getToken({
        code: req.query.code,
        redirect_uri: redirectUri
    }).then(results => {
        // We have a Dropbox access token and the user identity now.
        const dropboxUserID = results.account_id;
        logger.success(`Got token for id: ${dropboxUserID}`)
        
        logger.info(`Getting firebase account for user with id: ${dropboxUserID}`)
        dbx.usersGetAccount({account_id: dropboxUserID}).then( user => {
            createFirebaseAccount(dropboxUserID, user).then( token => {
                logger.success(`Got firebase token for user with id: ${dropboxUserID}`);
                res.redirect("/#"+token);
            }).catch( err => {
                logger.error(`Error getting firebase token for user with id: ${dropboxUserID}`, err);
                res.send(err);
            });
        }).catch(err => {
            logger.error(`Error getting dropbox user info for id: ${dropboxUserID}`, err);
            res.send(err);
        });
    }, error => {
        logger.error(`Login error - couldn't get token from code, redirect_uri: ${callbackUri}`);
        res.send(error.context)
    });
});


// Host compiled contributor portal
app.use("/", express.static("dist"));
app.use("/images", express.static("./templates/images"));


// Start the server
const PORT = process.env.PORT || 8080;
logger.info("Starting server on port "+PORT);
app.listen(PORT, () => {
    logger.success(`App listening on port ${PORT}`);
    logger.success("Press Ctrl+C to quit.");
});
