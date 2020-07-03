const express = require('express');
const exphbs  = require('express-handlebars');
const fb = require("firebase-admin");
const fs = require("fs");
const path = require('path');
const fetch = require('isomorphic-fetch');
const dropbox = require('dropbox');
const axios = require('axios');
const jimp = require('jimp');

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
const PORT = process.env.PORT || 8080;

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
app.set('trust proxy', true);

let fetchContributionByName = (req, res, contributionName, template, callback, isPreview=true) => {
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
            return;
        } else {
            logger.log(`Found ${snapshots.size} matches for name: ${contributionName}`);
            snapshots.forEach(snapshot => {
                let collRef = snapshot.data();
                callback(req, res, collRef, template, isPreview);
            });
        }
    }).catch( err => {
        logger.error(`Error fetching contribution by name "${contributionName}"`, err);
        callback(req, res, null);
    });
};

// Define function to render with handlebars
let renderFromFirebase = (req, res, collRef, template, isPreview) => {
    if (!collRef) return;

    // Get images
    let images = [];
    let collectionDoc = collRef;
    let getImages = collRef.ref.collection("Images").get().then( imgSnapshot => {
        logger.success(`Successfully fetched ${imgSnapshot.size} images for ${collRef.name} doc id: ${collRef.ref.id}`);
        images = imgSnapshot.docs.map(doc => {
            let imageData =  doc.data();
            if(isPreview) {
                imageData['webLarge'] = imageData['url'];
                imageData['webThumb'] = imageData['url'];
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
                    vid.thumbnail = `http://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
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

let previewReqHandler = (req, res) => {
    let collName = req.params.collection.toLowerCase();
    logger.info(`User request preview for collection: ${collName}`);
    fetchContributionByName(req, res, collName, "template", renderFromFirebase);
}

let renderReqHandler = (req, res) => {
    let collName = req.params.collection.toLowerCase();
    logger.info(`User request preview for collection: ${collName}`);
    fetchContributionByName(req, res, collName, "template", renderFromFirebase, false);
}

app.get("/header-new.php", (req, res) => {
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
app.get("/render/:collection", renderReqHandler);


app.get("/published/header-new.html", (req, res) => {
    logger.info('User request published/header-new.html');
    res.sendFile("./mockup/header-new.html", {root: __dirname});
});

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
    const name = req.body.name;
    const slug = name.toLowerCase().replace(/ /gi, '-');
    logger.info(`User request publish for page ${slug}`)
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
                axios.get(`http://0.0.0.0:${PORT}/render/${slug}`).then( resp => {
                    logger.success(`Got preview render for page ${slug}, uploading to dropbox`);
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

const pause = (milliseconds) => {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

// Optimize Endpoint
app.post("/optimize", (req, res) => {
    const token = req.body.auth;
    const collectionPath = req.body.ref;
    logger.info(`User request optimize images in collection ${collectionPath}`)

    fb.auth().verifyIdToken(token).then(decodedToken => {
        const uid = decodedToken.uid;
        logger.success(`Successfully validated token for user account_id: ${uid} requesting to optimize ${collectionPath}`)
        // Get user info from db
        fb.firestore().collection('Users').doc('authorized').get().then(snapshot => {
            logger.success(`Successfully get authorized users, checking account_id: ${uid}`)
            if(snapshot.data()[uid]) {
                logger.success(`User ${uid} is authorized, beginning optimization`);

                let slug;
                fb.firestore().collection(collectionPath).parent.get().then(doc => {
                    slug = doc.data().name.toLowerCase().replace(/ /gi, '-');
                    return fb.firestore().collection(collectionPath).get();
                }, err => {
                    logger.error(`Error getting parent doc for ${collectionPath}`);
                }).then(snapshot => {
                    logger.success(`Fetched image data ${collectionPath}`);
                    let docs =  snapshot.docs.map(doc => [doc, doc.data()]);
                    logger.success(`Parsed image data, ${docs.length} images in ${collectionPath}`);
                    docs = docs.filter(doc => !doc['optimized']);
                    logger.success(`Filtered ${docs.length} unoptimized images ${collectionPath}`);
                    // Process images - promise chains for each image run in parallel
                    // imgProcs is array of promises for processed image data
                    let imgProcs = docs.map(async docData => {
                        const docRef = docData[0];
                        const doc = docData[1];
                        let filename;

                        let imgData = await fb.firestore().doc(docRef.ref.path).update({
                            'optimizing': true,
                        }).then(() => {
                            logger.info("Successfully set optimizing status in firebase");
                            return jimp.read(doc.url)
                        }, err => {
                            logger.error(`Error setting optimizing status`, err);
                        }).then( image => {
                            let large = image.clone(), 
                                thumb = image.clone();
                            if(image.bitmap.width > 2000 || image.bitmap.height > 2000) {
                                large = large.scaleToFit(2000, 2000);
                            }
                            if(image.bitmap.width > 800 || image.bitmap.height > 800) {
                                thumb = thumb.scaleToFit(800, 800);
                            }
                            large = large.quality(80);
                            thumb = thumb.quality(80);

                            const cappedCaption = doc.caption.length > 150 ? doc.caption.substring(0, 150) : doc.caption;
                            filename = `${cappedCaption ? cappedCaption.toLowerCase().replace(/ /g, '-') : ''}_${docRef.id}`;

                            let pGetBuffers = [large.getBufferAsync(jimp.MIME_PNG),
                                               thumb.getBufferAsync(jimp.MIME_PNG)];
                            return Promise.all(pGetBuffers);
                        }, err => {
                            logger.error(`Error opening image at url ${doc.url}`, err);
                        }).then(buffers => {
                            const [lgBuff, thumbBuff] = buffers;
                            return {
                                'lgBuff': lgBuff,
                                'thumbBuff': thumbBuff,
                                'uploadPath': `/jhdb global/Published/${slug}/images/${filename}`,
                                'docRef': docRef,
                                'filename': filename,
                            };
                        }, err => {
                            logger.error('Error getting image buffers', err);
                            res.status(500).send('Error getting image buffers');
                        });

                        logger.log("Processing image data...")
                        return imgData;
                    });

                    // Wait until all images have been processed, then begin upload
                    Promise.all(imgProcs).then(sessions => {
                        logger.success("Reached end of batch");

                        // Process uploads synchronously - this chains upload function promises
                        // and appends dropbox responses to accumulator array (results) to be returned by
                        // sessions.reduce(). The final result array is passed to the resolver (then) for
                        // the containing Promise.all call above.
                        return sessions.reduce((p, item) => {
                            return p.then(async results => {
                                logger.log(`Uploading lg and thumb for ${item['uploadPath']}`);
                                let lgUp = await dbx.filesUpload({
                                    "path": `${item['uploadPath']}-lg.png`,
                                    "mode": "overwrite",
                                    "contents": item['lgBuff']
                                });
                                let thumbUp = await dbx.filesUpload({
                                    "path": `${item['uploadPath']}-thumb.png`,
                                    "mode": "overwrite",
                                    "contents": item['thumbBuff']
                                });
                                await fb.firestore().doc(item.docRef.ref.path).update({
                                    'webLarge': `./images/${item.filename}-lg.png`,
                                    'webThumb': `./images/${item.filename}-thumb.png`,
                                    'optimizing': false,
                                    'optimized': true
                                });
                                return [...results, lgUp, thumbUp]
                            }).catch(err => {
                                logger.err(`Error uploading ${item['uploadPath']} to dbx`, err)
                            });
                        }, Promise.resolve([]));
                    }, err => {
                        logger.err(`Error processing images for ${collectionPath}`, err);
                    }).then( (uploads) => {
                        logger.success("Image optimization complete");
                        res.status(200).send(uploads);
                    }, err => {
                        logger.error(`Error processing file upload sequence for processed images ${collectionPath}`, err);
                        res.status(500).send("Error processing uploads");
                    });
                }, err => {
                    logger.error(`Failed to process image data for ${collectionPath}`, err)
                    res.status(500).send("Couldn't fetch images collection");
                });
            } else {
                logger.error(`User with account_id: ${uid} is not authorized`)
                res.status(403).send("Not authorized");
            }
        }, err => {
            logger.error(`Error fetching user authorized doc to check account id: ${uid}`, err);
            res.status(500).send("Error fetching authorized doc");
        });
    }, err => {
        logger.error(`Error validating token, can not optimize ${collectionPath}`)
        res.status(403).send("Failed to validate token");

    });
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


// Host compiled contributor portal
app.use("/", express.static("dist"));
app.use("/images", express.static("./templates/images"));


// Start the server
logger.info("Binding to port "+PORT);
app.listen(PORT, () => {
    logger.success(`App listening on port ${PORT}`);
    logger.success("Press Ctrl+C to quit.");
});
