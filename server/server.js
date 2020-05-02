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

// Fetch cli args
const IS_DEV = process.env["DEV"];
logger.info(`Starting server in ${IS_DEV ? "dev" : "prod"} mode`);

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

let fetchContributionByName = (req, res, contributionName, callback) => {
    const collRoot = fb.firestore().collection("Contributions");
    let collsRef;
    let collName = contributionName.toLowerCase().replace(/-/g, " ")
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    logger.info(`Fetching contribution by name: "${contributionName}" -> "${collName}"`);
    collsRef = collRoot.where("name", "==", collName);
    collsRef.get().then(snapshots => {
        if (snapshots.empty) { // No such collection
            logger.error(`No matching contributions found for name: ${contributionName}`);
            res.send("No matching contributions found");
            callback(req, res, null);
            return;
        } else {
            logger.log(`Found ${snapshots.size} matches for name: ${contributionName}`);
            snapshots.forEach(snapshot => {
                let collRef = snapshot.data();
                callback(req, res, collRef);
            });
        }
    }).catch( err => {
        logger.error(`Error fetching contribution by name "${contributionName}"`, err);
        callback(req, res, null);
    });
};

// Define function to render with handlebars
let renderFromFirebase = (req, res, collRef) => {
    if (!collRef) return;

    // Get images
    let images = [];
    let collectionDoc = collRef;
    let getImages = collRef.ref.collection("Images").get().then( imgSnapshot => {
        logger.success(`Successfully fetched ${imgSnapshot.docs.count} videos for ${collRef.name} doc id: ${collRef.ref.id}`);
        images = imgSnapshot.docs.map(doc => {
            return doc.data();
        });
    }).catch( err => {
        logger.error(`Error fetching images for name: ${collRef.name} id: ${collRef.ref.id}`, err);
    });
    // Get audio
    let audio = [];
    let getAudio = collRef.ref.collection("Audio").get().then( audioSnapshot => {
        logger.success(`Successfully fetched ${audioSnapshot.docs && audioSnapshot.docs.count} audio entries for ${collRef.name} doc id: ${collRef.ref.id}`);
        audio = audioSnapshot.map(doc => {
            return doc.data();
        });/*.sort((a, b) => {
            if (!a.index) return -1;
            if (!b.index) return 1;
            return a.index - b.index;
        });*/

    }).catch( err => {
        logger.error(`Error fetching audio for name: ${collRef.docs && collRef.docs.count} id: ${collRef.ref.id}`, err);
    });
    // Get video
    let video = [];
    let getVideo = collRef.ref.collection("Video").get().then( videoSnapshot => {
        logger.success(`Successfully fetched ${videoSnapshot.docs.count} videos for ${collRef.name} doc id: ${collRef.ref.id}`);
        videoSnapshot.map(doc => {
            let data = doc.data();
            data.url = "https://www.youtube.com/embed/" + data.url.split("/")[3];
            return data;
        });/*.sort((a, b) => {
            if (!a.index) return -1;
            if (!b.index) return 1;
            return a.index - b.index;
        });*/
    }).catch( err => {
        logger.error(`Error fetching video for name: ${collRef.name} id: ${collRef.ref.id}`, err);
    });
    
    Promise.all([getImages, getAudio, getVideo]).then(vals => {
        logger.log(`Rendering preview template with name: ${collRef.name} found doc id: ${collRef.ref.id}`);
        collectionDoc.shortDescription = collectionDoc && collectionDoc.description && collectionDoc.description.substr(200);
        
        collectionDoc.images = images;
        collectionDoc.audio = audio;
        collectionDoc.video = video;
        res.render("preview", collectionDoc);
        logger.success(`Successfully rendered preview template with name: ${collRef.name} doc id: ${collRef.ref.id}`);
        return;
    }).catch( err => {
        logger.error(`Render error: ${collRef.name} id: ${collRef.ref.id}`, err);
        res.render("preview", collectionDoc);
    })
};

let previewReqHandler = (req, res) => {
    let collName = req.params.collection.toLowerCase();
    logger.info(`User request preview for collection: ${collName}`);
    fetchContributionByName(req, res, collName, renderFromFirebase);
}

app.get("/preview/header-new.html", (req, res) => {
    logger.info('User request preview/header-new.html');
    res.sendFile("./mockup/header-new.html", {root: __dirname});
});

app.get("/preview/home", (req, res) => {
    logger.info('User request preview/home');
    res.sendFile("./templates/CMS-landing-page.html", {root: __dirname});
});

app.get("/preview/branch", (req, res) => {
    logger.info('User request preview/branch');
    res.sendFile("./templates/landing-page.html", {root: __dirname});
});
app.use("/mockup", express.static(path.join(__dirname, './mockup')));

app.get("/preview/:collection", previewReqHandler);

let publishedReqHandler = (req, res) => {
    let collName = req.params.collection.toLowerCase();
    logger.info(`User request view published collection: ${collName}`);
    fb.firestore().collection("Contributions").doc("published").get().then(snapshot => {
        if (snapshot.exists) {
            let publishedList = snapshot.data();
            fetchContributionByName(req, res, collName, (req, res, collRef) => {
                if (!collRef) return;
                if (publishedList[collRef.ref.id] && publishedList[collRef.ref.id] === 'true') {
                    // This contribution is published - proceed
                    renderFromFirebase(req, res, collRef);
                } else {
                    logger.error(`Contribution "${collName}" is not published.`);
                    res.send("This contribution is not published!");
                }
            });
        } else {
            console.log("Unable to fetch published list from Firebase!");
            res.sendStatus(500);
        }
    });
};

app.get("/published/header-new.html", (req, res) => {
    logger.info('User request published/header-new.html');
    res.sendFile("./mockup/header-new.html", {root: __dirname});
});

app.get("/published/:collection", publishedReqHandler);

app.get("/upload", (req, res) => {
    logger.info('User requesting upload link. Validating token...');
    let token = req.query["auth"];
    fb.auth().verifyIdToken(token).then(decodedToken => {
        logger.success(`Successfully validated token for user account_id: ${decodedToken.uid} name: ${decodedToken.name}`)
        
        let path = "/jhdb global/"+decodedToken.name.toLowerCase();
        let time = new Date();
        time.setTime(time.getTime() + (1*60*60*1000)); // Add 1hr to current time
        time.setSeconds(0, 0); // Remove seconds/millis
        let deadline = time.toISOString().replace(".000", ""); // Remove millis from ISO string so dbx doesn't complain
        // TODO: Find a less hacky way to do this^ (pass in format string to ISOString()?)
        
        logger.log(`Generating upload link for account_id: ${decodedToken.uid} path: ${path} deadline: ${deadline}`);

        dbx.fileRequestsCreate({"title": `JHDB File Upload - ${decodedToken.name} [Contributor Portal]`, "destination": path, "deadline": {"deadline": deadline}}).then( (dat => {
            logger.success(`Successfully sent upload link for account_id: ${decodedToken.uid} path: ${path}`);
            console.log(dat);
            res.send(dat && dat.url);
        })).catch(err => {
            logger.error(`Failed to generate upload link for account_id: ${decodedToken.uid} path: ${path}`, err);
            res.send(err);
        });
    }).catch(err => {
        logger.err('Error authenticating user token for upload request', err);
        res.sendStatus(400);
    });
});




// Login

let apiUrl = (req, suffix) => {
    // Enforce https if not running in dev mode
    let stem = `${IS_DEV ? 'http' : 'https'}://${req.get('host')}`;
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
logger.info("Binding to port "+PORT);
app.listen(PORT, () => {
    logger.success(`App listening on port ${PORT}`);
    logger.success("Press Ctrl+C to quit.");
});
