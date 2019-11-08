const express = require('express');
const exphbs  = require('express-handlebars');
const fb = require("firebase-admin");
const fs = require("fs");
const proxy = require("express-http-proxy");

const serviceAccount = require("./server-creds.json");

fb.initializeApp({
    credential: fb.credential.cert(serviceAccount),
    databaseURL: "https://" + fb.credential.project_id + "firebaseio.com"
});



const app = express();

// Configure handlebars
app.engine("handlebars", exphbs({defaultLayout: "template"}));
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

app.get("/header-new.html", (req, res) => {
    res.sendFile("templates/header-new.html", {root: __dirname});
});

app.get("/home", (req, res) => {
    res.sendFile("templates/CMS-landing-page.html", {root: __dirname});
});

app.get("/branch", (req, res) => {
    res.sendFile("templates/landing-page.html", {root: __dirname});
});

// app.get("/collection/:collection", collectionReqHandler);
// app.get("/collection/:collection/:subpage", collectionReqHandler);
app.get("/:collection", previewReqHandler);

if (process.argv.length > 2 && process.argv[2] === "--dev") {   
    // Running in dev, proxy to react dev server
    app.use("/", proxy("http://localhost:3000/"));
} else {
    // Host compiled contributor portal
    app.use("/", express.static("build"));
    app.use("/static", express.static("build/static"));
    app.use("/images", express.static("templates/images"));
}


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
});
