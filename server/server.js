const express = require('express');
const exphbs  = require('express-handlebars');
const fb = require("firebase-admin");
const path = require('path');
const fetch = require('isomorphic-fetch');
const dropbox = require('dropbox');
const axios = require('axios');

const logger = require('./logger');

/*=== Load credentials ===*/
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

/*=== Init oauth2 handler ===*/
const oauth2 = require('simple-oauth2').create(credentials);

/*=== Load environment ===*/
const IS_DEV = process.env["DEV"];
const IS_LOCAL = process.env["LOCAL"];
const PORT = process.env.PORT || 8080;

logger.info(`Starting server in ${IS_DEV ? "dev" : "prod"} mode`);

fb.initializeApp({
    credential: fb.credential.cert(serviceAccount),
    databaseURL: IS_LOCAL ? "http://localhost:8000" : "https://" + serviceAccount.project_id + "firebaseio.com"
});

/*=== Initialize dropbox integration ===*/
const dbx = new dropbox.Dropbox({
    "clientId": dropboxKey, 
    "clientSecret": dropboxSecret, 
    "accessToken": dropboxToken,
    "fetch": fetch
});

/*=== Create express server ===*/
const app = express();

/*=== Configure handlebars ===*/
app.engine("handlebars", exphbs({defaultLayout: "template"}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "handlebars");
app.set('trust proxy', true);

let logUsage = () => {
    const mem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;
    const totalMem = Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100;
    const memRSS = Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100;
    logger.info(`Resource Usage\nCPU\t${process.cpuUsage().user}\nMemory\t${mem}MB / ${totalMem}MB\nMem RSS\t${memRSS}`)
}

// Define function to render with handlebars
let renderFromFirebase = (req, res, collRef, template, isPreview) => {
    if (!collRef) {
        logger.error("Erorr: Can't render null data");
        return;
    }
    logger.info(`Rendering page ${collRef.ref.path} in ${isPreview ? 'preview' : 'publish'} mode`);
    // Get images
    let images = [];
    let collectionDoc = collRef;
    let getImages = collRef.ref.collection("Images").get().then( imgSnapshot => {
        logger.success(`Successfully fetched ${imgSnapshot.size} images for ${collRef.name} doc id: ${collRef.ref.id}`);
        images = imgSnapshot.docs.map(doc => {
            let imageData =  doc.data();
            if(isPreview) {
                imageData['webLarge'] = imageData['url'];
                imageData['webThumb'] = imageData['thumbnail'];
            }
            return imageData;
        });
        images.sort((a, b) => {
            if (!a.index) return -1;
            if (!b.index) return 1;
            return a.index - b.index;
        });
    }).catch( err => {
        logger.error(`Error fetching images for name: ${collRef.name} id: ${collRef.ref.id}`, err);
    });
    // Get audio
    let audio = [];
    let getAudio = collRef.ref.collection("Audio").get().then( audioSnapshot => {
        logger.success(`Successfully fetched ${audioSnapshot.size} audio entries for ${collRef.name} doc id: ${collRef.ref.id}`);
        audio = audioSnapshot.docs.map(doc => {
            return doc.data();
        });
    }).catch( err => {
        logger.error(`Error fetching audio for name: ${collRef.name} id: ${collRef.ref.id}`, err);
    });
    // Get video
    let video = [];
    let getVideo = collRef.ref.collection("Video").get().then( videoSnapshot => {
        logger.success(`Successfully fetched ${videoSnapshot.size} videos for ${collRef.name} doc id: ${collRef.ref.id}`);
        video = videoSnapshot.docs.map(doc => {
            let data = doc.data();
            data.url = "https://www.youtube.com/embed/" + data.url.split("/")[3];
            return data;
        });
        video = video.sort((a, b) => {
            if (!a.index) return -1;
            if (!b.index) return 1;
            return a.index - b.index;
        });
    }).catch( err => {
        logger.error(`Error fetching video for name: ${collRef.name} id: ${collRef.ref.id}`, err);
    });
    
    Promise.all([getImages, getAudio, getVideo]).then(vals => {
        logger.log(`Rendering preview template with name: ${collRef.name} found doc id: ${collRef.ref.id}`);
        collectionDoc.shortDescription = collectionDoc && collectionDoc.description && collectionDoc.description.substr(200);
        
        collectionDoc.dataItems = (images.length < 6) ? images.length : 5;
        video.forEach( vid => {
            if(vid.url) {
                const id = vid.url.substring(vid.url.lastIndexOf('/') + 1);
                if(!vid.thumbnail) {
                    vid.thumbnail = `http://i3.ytimg.com/vi/${id}/0.jpg`;
                }
                vid.url = `https://www.youtube.com/watch?v=${id}`;
            }
        })

        console.log(collectionDoc);
        if(!collectionDoc.imagesTitle) collectionDoc.imagesTitle = "Images";
        if(!collectionDoc.audioTitle) collectionDoc.audioTitle = "Audio";
        if(!collectionDoc.videosTitle) collectionDoc.videosTitle = "Videos";
        if(!collectionDoc.bioPrefix) {
            collectionDoc.bioPrefix = "Biography of ";
        } else if(collectionDoc.bioPrefix === 'DISABLED') {
            collectionDoc.bioPrefix = '';
        }
        
        collectionDoc.images = images;
        collectionDoc.audio = audio;
        collectionDoc.video = video;
        collectionDoc.layout = template;
        res.render(template, collectionDoc);
        logger.success(`Successfully rendered preview template with name: ${collRef.name} doc id: ${collRef.ref.id}`);
        return;
    }).catch( err => {
        logger.error(`Render error: ${collRef.name} id: ${collRef.ref.id}`, err);
        res.render(template, collectionDoc);
    })
};

let getPageAndRender = (req, res, isPreview=true) => {
    const pageId = ""+req.params.page;
    if(pageId.includes("/")) {
        logger.error("Error: invalid preview request (/ in page Id)");
        res.send("Error: invalid preview request (/ in page Id)");
        return;
    }
    logger.info(`User request preview for collection: ${pageId}`);
    try {
        const pageRef = fb.firestore().collection("Contributions").doc(pageId);
        pageRef.get().then(snapshot => {
            if(snapshot.exists) {
                logger.success(`Page ${pageId} exists`);
                const page = snapshot.data();
                page.ref = snapshot.ref;
                renderFromFirebase(req, res, page, "template", isPreview);
            } else {
                logger.error(`Error: No such page found ${pageId}`, err);
                res.send("Error: Page not found in database");
            }
        }).catch(err => {
            logger.error(`Error: Could not fetch page data for ${pageId}`, err);
            res.send("Error: Could not fetch page data");
        });
    } catch(err) {
        logger.error("Error: Could not create db ref for "+pageId, err);
        res.send("Error: Could not create db ref");
    }
}

let previewReqHandler = (req, res) => {
    getPageAndRender(req, res, true);
}

let renderReqHandler = (req, res) => {
    getPageAndRender(req, res, false);
}

app.get("/header-new.php", (req, res) => {
    logger.info('User request preview/header-new.html');
    res.sendFile("./mockup/header-new.html", {root: __dirname});
});

app.get("/published/header-new.html", (req, res) => {
    logger.info('User request published/header-new.html');
    res.sendFile("./mockup/header-new.html", {root: __dirname});
});

app.get("/preview/:page", previewReqHandler);
app.get("/render/:page", renderReqHandler);

// Enable json
app.use(express.json());

app.post("/upload", (req, res) => {
    logger.info('User requesting upload link. Validating token...');
    const token = req.body.auth;
    const folder = req.body.folder;
    fb.auth().verifyIdToken(token).then(decodedToken => {
        const uid = decodedToken.uid;
        logger.success(`Successfully validated token for user account_id: ${uid}`)
        // Get user info from db
        fb.firestore().collection('Users').doc(uid).get().then(snapshot => {
            logger.success(`Successfully fetched user data for account_id: ${uid}`);
            const user = snapshot.data();
            let path = `/jhdb global/${user.name.toLowerCase()}/${folder ? folder+'/' : ''}`;
            let time = new Date();
            time.setTime(time.getTime() + (1*60*60*1000)); // Add 1hr to current time
            time.setSeconds(0, 0); // Remove seconds/millis
            let deadline = time.toISOString().replace(".000", ""); // Remove millis from ISO string so dbx doesn't complain
            // TODO: Find a less hacky way to do this^ (pass in format string to ISOString()?)
            
            logger.log(`Generating upload link for account_id: ${decodedToken.uid} path: ${path} deadline: ${deadline}`);
    
            dbx.fileRequestsCreate({"title": `File Upload - ${user.name}/${folder ? folder : ""} [Contributor Portal]`, "destination": path, "deadline": {"deadline": deadline}}).then( (dat => {
                logger.success(`Successfully sent upload link for account_id: ${decodedToken.uid} path: ${path}`);
                console.log(dat);
                res.send(dat && dat.url);
            })).catch(err => {
                logger.error(`Failed to generate upload link for account_id: ${decodedToken.uid} path: ${path}`, err);
                res.send(err);
            });
        }, err => {
            logger.error(`Error fetching user info from db for id: ${uid}`);
        });
    }).catch(err => {
        logger.err('Error authenticating user token for upload request', err);
        res.sendStatus(400);
    });
});

// Publish Endpoint
app.post("/publish", (req, res) => {
    const token = req.body.auth;
    const page = req.body.page;
    const name = req.body.name;
    const test = req.body.test;
    let slug = name.toLowerCase().replace(/ /gi, '-');
    if(test) {
        slug = "test-" + slug
    }
    logger.info(`User request publish for page ${page} with slug ${slug}`)
    if(!slug) {
        res.status(404).send("No such page found");
    }
    const force = req.body.force;
    fb.auth().verifyIdToken(token).then(decodedToken => {
        const uid = decodedToken.uid;
        logger.success(`Successfully validated token for user account_id: ${uid} requesting to publish ${slug}`)
        // Get user info from db
        fb.firestore().collection('Users').doc('admin').get().then(snapshot => {
            logger.success(`Successfully get admin users, checking account_id: ${uid}`)
            if(snapshot.data()[uid]) {
                logger.success(`User ${uid} is admin, beginning publish`);
                axios.get(`http://0.0.0.0:${PORT}/render/${page}`).then( resp => {
                    logger.success(`Got render for page ${slug}, uploading to dropbox`);
                    dbx.filesUpload({
                        "path": `/jhdb global/Published/${slug}/index.php`,
                        "mode": "overwrite",
                        "contents": resp.data
                    }).then(() => {
                        logger.success(`Successfully uploaded html file to dropbox for ${slug}`);
                        res.status(200).send("Upload success!");
                    }, (err) => {
                        logger.error(`Error uploading html file to dropbox for ${slug}`, err);
                        res.status(500).send("Error uploading to Dropbox");
                    });
                }).catch(err => {
                    logger.error(`Error fetching preview for ${name}`, err);
                    res.status(500).send("Error downloading preview page");
                });
            } else {
                logger.error(`User with account_id: ${uid} is not authorized to publish`)
                res.status(403).send("Not authorized");
            }
        }, err => {
            logger.error(`Error fetching user admin doc to check account id: ${uid}`, err);
            res.status(500).send("Error fetching admin doc");
        });
    }, err => {
        logger.error(`Error validating token, can not publish ${slug}`)
        res.status(403).send("Failed to validate token");

    });
});

// Optimize Endpoint
app.post("/optimize", (req, res) => {
    let retry = false;
    const doOptimize = () => {
        const cloudFnUrl = IS_LOCAL ? 
        `http://localhost:5001/${serviceAccount.project_id}/us-central1/optimize` : 
        `https://us-central1-${serviceAccount.project_id}.cloudfunctions.net/optimize`;
        logger.info("/optimize, proxy to function");
        axios.post(cloudFnUrl, {
            auth: req.body['auth'],
            ref: req.body['ref'],
            parentPage: req.body['parentPage'],
            test: req.body['test'],
            force: req.body['force'],
        }).then(result => {
            logger.info("Optimize success");
            res.status(200).send(result.body);
        }, err => {
            logger.error("Optimize error", err);
            if(!retry) {
                logger.info("Retry in 1s...")
                retry = true;
                setTimeout(doOptimize, 1000);
            } else {
                res.status(500).send(err.message);
            }
        })
    };
    setTimeout(doOptimize, 1000);
    // 1s delay allows function server to restart. This is necessary to allow function server
    // to restart, as we kill it at the end of the previous request. This is a horrendous hack
    // because GCP's node process doesn't free memory properly, maybe we can move this to a 
    // subprocess later to manually free up the memory?
});


// Login

let apiUrl = (req, suffix) => {
    // Enforce https if not running in dev mode
    let stem = `${IS_DEV ? 'http' : 'https'}://${req.get('x-forwarded-host') || req.get('host')}`;
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
        return fb.auth().createUser(userData).then( () => {
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
    //   scope: "account_info.read files.content.read files.metadata.read"
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
                logger.success(`Got firebase token for user with id: ${dropboxUserID}, updating db`);
                fb.firestore().collection('Users').doc(dropboxUserID).set({
                    uid: user['account_id'],
                    email: user['email'],
                    name: (user['name'] ? user.name['display_name'] : false) || "Unnamed Contributor",
                    displayPhoto: user['profile_photo_url'] || "",
                }).then( () => {
                    logger.success(`Successfully updated database entry for user id: ${dropboxUserID}`);
                    res.redirect("/#"+token);
                }).catch(err => {
                    logger.error(`Failed to updat database entry for user id: ${dropboxUserID}`, err);
                    res.redirect("/#"+token);
                });
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
        res.send(error.context);
    });
});

let staticHandler = express.static("dist");

if(IS_DEV) {
    // If dev, use Parcel for HMR
    const Bundler = require('parcel-bundler');
    const bundler = new Bundler('client/index.html', {
        hmr: true,
        hmrPort: 4321,
    });
    staticHandler = bundler.middleware();
}
    
// Host compiled contributor portal
app.use("/images", express.static("./templates/images"));
app.use("/", staticHandler);
// Allow React Router to handle subroutes
app.use("/:route/", staticHandler);
app.use("/:route/:subroute", staticHandler);
app.use("/:route/:subroute/:subsubroute", staticHandler);
// App Manifest
app.get("/manifest.json", (req, res) => {
    res.sendFile("./dist/manifest.json", {root: __dirname});
});

// Start the server
logger.info("Binding to port "+PORT);
app.listen(PORT, () => {
    logger.success(`App listening on port ${PORT}`);
    logger.success("Press Ctrl+C to quit.");
});
