const express = require('express');
const exphbs  = require('express-handlebars');
const fb = require("firebase-admin");
const fs = require("fs");
const proxy = require("express-http-proxy");
const path = require('path');
const axios = require('axios');
const fetch = require('isomorphic-fetch');
const dropbox = require('dropbox');

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
        collsRef = collRoot.doc(collectionId);
    } else {
        collsRef = collRoot.where("name", "==", collName);
    }
    console.log(collsRef);

    collsRef.get().then(snapshots => {
        if(!collectionId && snapshots.empty) {
            // No such collection
            console.log("No matching collections found");
            res.send("No matching collections found");
            console.log(snapshots.data);
            return;
        } else {
            let snap = collectionId ?  [snapshots] : snapshots;
            console.log("Found "+snapshots.size + " matching collections");
            snap.forEach(collRef => {
                // TODO: What to do if more than one?

                let collectionDoc = collRef.data();


                console.log(collRef);

                let images = [];
                collRef.ref.collection("Images").get().then( imgSnapshot => {
                    console.log(imgSnapshot);
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

                            console.log("Render template with doc: " + collRef.id);

                            collectionDoc.shortDescription = collectionDoc && collectionDoc.description && collectionDoc.description.substr(200);

                            collectionDoc.images = images;
                            collectionDoc.audio = audio;
                            collectionDoc.video = video;
                            res.render("preview", collectionDoc);

                            return;
                        }).catch( err => {
                            console.log("ERROR\n");
                            console.log(err);
                            res.render("preview", collectionDoc);
                        });
                    }).catch( err => {
                        console.log("ERROR\n");
                        console.log(err);
                        res.render("preview", collectionDoc);
                    });
                }).catch( err => {
                    console.log("ERROR\n");
                    console.log(err);
                    res.render("preview", collectionDoc);
                });

            })
        }
     }).catch( err => {
        console.log("ERROR\n");
        console.log(err);
     });
};


// Set up collection routing function
let collectionReqHandler = (req, res) => {
    let filename = req.params.collection.toLowerCase();
    // let subpage = req.params["subpage"] && req.params.subpage.toLowerCase();
    // TODO: Implement subpage logic
    // Check if static content is available
    fs.stat("legacy/" + filename, (err, stats) => {
        if(err){
            switch(err.code){
                case "ENOENT":
                    console.log(filename + " does not exist");
                    break;
                default:
                    console.log("Unexpected error code in app.get(/:collection).");
            }
            // If static files DNE, try to load from firebase
            return renderFromFirebase(req, res, filename);
        }
        // If static files exist, check if request includes index.html
        if (stats.isDirectory()) {

            fs.stat("legacy/" + filename + "/index.html", function(err, stats) {
                res.sendFile("legacy/" + filename + "/index.html",{ root: __dirname });
            });

        } else {
            res.render("legacy/" + filename);
        }
      });
};

let previewReqHandler = (req, res) => {
    let filename = req.params.collection.toLowerCase();
    return renderFromFirebase(req, res, filename);
}

app.get("/preview/header-new.html", (req, res) => {
    res.sendFile("./templates/header-new.html", {root: __dirname});
});

app.get("/preview/home", (req, res) => {
    res.sendFile("./templates/CMS-landing-page.html", {root: __dirname});
});

app.get("/preview/branch", (req, res) => {
    res.sendFile("./templates/landing-page.html", {root: __dirname});
});

app.get("/preview/:collection", previewReqHandler);




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

    console.log("USER UPDATE "+userData);

    // Create or update the user account.
    const userCreationTask = fb.auth().updateUser(dropboxID, userData).catch(err => {
          fb.auth().createUser(userData);
          console.log("NO SUCH USER - CREATING NEW FB USER FOR "+dropboxID);
      });
      
  
    // Wait for all async task to complete then generate and return a custom auth token.
    return Promise.all([userCreationTask]).then(() => {
      // Create a Firebase custom auth token.
      return fb.auth().createCustomToken(dropboxID);
    });
};
  

app.get('/redirect', (req, res) => {
    const redirectUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: callbackUri(req),
    });
    res.redirect(redirectUri);
  });

app.get("/login", (req, res) => {
    oauth2.authorizationCode.getToken({
        code: req.query.code,
        redirect_uri: callbackUri(req)
      }).then(results => {
        // We have a Dropbox access token and the user identity now.
        const dropboxUserID = results.account_id;
        
        dbx.usersGetAccount({account_id: dropboxUserID}).then( user => {
            createFirebaseAccount(dropboxUserID, user).then( token => {
                res.redirect("/#"+token);
            }).catch( err => {
                res.send(err);
            });
        }).catch(err => {
            res.send(err);
        });
        // res.send( results );
        // Create a Firebase account and get the Custom Auth Token.
        // createFirebaseAccount(dropboxUserID, accessToken).then(firebaseToken => {
        //   // Redirect to a frontend url that will log the user in
        //   res.redirect(`${req.session.source}login?token=${firebaseToken}`)
        // });
      }, error => {
        console.error(error);
        res.send(error.context)
      });
});


// Host compiled contributor portal
app.use("/", express.static("dist"));
// app.use("/static", express.static("build/static"));
app.use("/images", express.static("./templates/images"));
// }


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
});
