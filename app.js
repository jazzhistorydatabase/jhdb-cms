/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');
var exphbs  = require('express-handlebars');
var fs = require("fs");
// must specify options hash even if no options provided!

var admin = require("firebase-admin");

var serviceAccount = require("./fb-server-creds.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testproj-34045.firebaseio.com"
});;



const app = express();

// Host compiled contributor portal
app.use('/cms', express.static('build'));
app.use('/static', express.static('build/static'));

// Configure handlebars
app.engine('handlebars', exphbs({defaultLayout: 'template'}));
app.set('view engine', 'handlebars');


// Define function to pull contribution from firebase and render with handlebars
let renderFromFirebase = function (req, res, collectionName) {
    const collRoot = admin.firestore().collection('Contributions');
    let collName = collectionName.toLowerCase().replace(/\-/g, ' ')
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

    const collsRef = collRoot.where('name', '==', collName);
    console.log(collsRef);

    collsRef.get().then(snapshots => {
        if(snapshots.empty) {
            // No such collection
            console.log("No matching collections found");
            res.send('No matching collections found');
            return;
        } else {
            console.log("Found "+snapshots.size + " matching collections");
            snapshots.forEach(collRef => {
                // TODO: What to do if more than one?

                let collectionDoc = collRef.data();


                console.log(collRef);

                let images = [];
                collRef.ref.collection('Images').get().then( imgSnapshot => {
                    console.log(imgSnapshot);
                    imgSnapshot.forEach(doc => {
                        images.push(doc.data());
                    });
                    let audio = [];
                    collRef.ref.collection('Audio').get().then( audioSnapshot => {
                        audioSnapshot.forEach(doc => {
                            audio.push(doc.data());
                        });

                        let video = [];
                        collRef.ref.collection('Video').get().then( videoSnapshot => {
                            videoSnapshot.forEach(doc => {
                                let data = doc.data();
                                data.url = "https://www.youtube.com/embed/" + data.url.split('/')[3];
                                video.push(data);
                            });

                            console.log("Render template with doc: " + collRef.id);

                            collectionDoc.shortDescription = collectionDoc && collectionDoc.description && collectionDoc.description.substr(200);

                            collectionDoc.images = images;
                            collectionDoc.audio = audio;
                            collectionDoc.video = video;
                            res.render('preview', collectionDoc);

                            return;
                        }).catch( err => {
                            console.log("ERROR\n");
                            console.log(err);
                            res.render('preview', collectionDoc);
                        });
                    }).catch( err => {
                        console.log("ERROR\n");
                        console.log(err);
                        res.render('preview', collectionDoc);
                    });
                }).catch( err => {
                    console.log("ERROR\n");
                    console.log(err);
                    res.render('preview', collectionDoc);
                });

            })
        }
     }).catch( err => {
        console.log("ERROR\n");
        console.log(err);
     });
};


// Set up collection routing function
let collectionReqHandler = function (req, res) {
    let filename = req.params.collection.toLowerCase();
    let subpage = req.params['subpage'] && req.params.subpage.toLowerCase();
    // Check if static content is available
    fs.stat('legacy/' + filename, function(err, stats) {
        if(err){
            switch(err.code){
                case 'ENOENT':
                    console.log(filename + ' does not exist');
                    break;
                default:
                    console.log('Unexpected error code in app.get(/:collection).');
            }
            // If static files DNE, try to load from firebase
            return renderFromFirebase(req, res, filename);
        }
        // If static files exist, check if request includes index.html
        if (stats.isDirectory()) {

            fs.stat('legacy/' + filename + '/index.html', function(err, stats) {
                res.sendFile('legacy/' + filename + '/index.html',{ root: __dirname });
            });

        } else {
            res.render('legacy/' + filename);
        }
      });
};

app.get('/header-new.html', function(req, res) {
    res.sendFile('templates/header-new.html', {root: __dirname});
});

app.get('/', function(req, res) {
    res.sendFile('templates/landing-page.html', {root: __dirname});
});
app.get('/:collection', collectionReqHandler);
app.get('/:collection/:subpage', collectionReqHandler);


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]
