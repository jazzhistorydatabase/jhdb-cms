const functions = require('firebase-functions');
const fb = require('firebase-admin');
const dropbox = require('dropbox');
const fetch = require('isomorphic-fetch');
const axios = require('axios');
const sharp = require('sharp');

fb.initializeApp();

const dropboxKey = functions.config().dbx.key;
const dropboxSecret = functions.config().dbx.secret;
const dropboxToken = functions.config().dbx.token;

const logger = require('./logger');

const dbx = new dropbox.Dropbox({
    "clientId": dropboxKey, 
    "clientSecret": dropboxSecret, 
    "accessToken": dropboxToken,
    "fetch": fetch
});

const logUsage = () => {
    const mem = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;
    const totalMem = Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100;
    const memRSS = Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100;
    logger.info(`Resource Usage\nCPU\t${process.cpuUsage().user}\nMemory\t${mem}MB / ${totalMem}MB\nMem RSS\t${memRSS}`)
}

const runtimeOpts = {
    timeoutSeconds: 150,
    memory: '1GB'
  }
  

// eslint-disable-next-line consistent-return
exports.optimize = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
    const token = req.body && req.body['auth'];
    const docPath = req.body && req.body['ref'];
    const parentPage = req.body && req.body['parentPage'];

    let step = "";
    try {
        logger.info(`User request optimize images in collection ${docPath}`);
        logUsage();
        
        if(!token || !docPath || !parentPage) {
            logger.error(`Malformed request, will not optimize ${docPath}`);
            return res.status(400).send("Malformed request  (must specify token, docPath, parentPage)");
        }
        step = "verifying user token";
        // Verify user token
        const decodedToken = await fb.auth().verifyIdToken(token);
        // Token validated, extract uid
        const uid = decodedToken.uid;
        logger.success(`Successfully validated token for user account_id: ${uid} requesting to optimize ${docPath}`)
        
        // Get user info from db
        step = "getting authorized snapshot"
        const authorizedSnapshot = await fb.firestore().collection('Users').doc('authorized').get();
        if (!authorizedSnapshot) {
            throw new Error("Could not get authorized users from firestore");
        }
        logger.success(`Successfully get authorized users, checking account_id: ${uid}`);

        // Check if user authorized
        step = "checking user permission"
        if(!authorizedSnapshot.data()[uid]) {
            logger.error(`User with account_id: ${uid} is not authorized, will not optimize ${docPath}`);
            return res.status(401).send("User not authorized");
        }
        logger.success(`User ${uid} is authorized, beginning optimization of ${docPath}`);

        // User is authorized, fetch image data
        step = "getting image metadata";
        const imageSnapshot = await fb.firestore().doc(docPath).get();
        if (!imageSnapshot) {
            logger.error(`Unable to fetch image metadata from db ${docPath}`);
            throw new Error("Unable to fetch image metadata from db");
        }
        logger.success(`Fetched image metadata ${docPath}`);

        // Parse image metadata
        step = "parsing image metadata"
        const doc = imageSnapshot.data();
        const docRef = imageSnapshot.ref;
        const isOptimized = doc['optimized'];
        logger.success(`Parsed image data at ${docPath}, optimized status: ${isOptimized}`);
        if(isOptimized) {
            logger.success(`Image already optimized, skipping ${docPath}`);
            return res.status(200).send("Already optimized");
        }
        logger.success(`Image not yet optimized, starting processing ${docPath}`);
        
        // Optimize images
        step = "setting image optimize status"
        logUsage();
        // We do this all in one go because if any of it fails we don't want to upload anything
        await fb.firestore().doc(docRef.path).update({
            'optimizing': true,
        });
        
        step = "fetching image from dropbox"
        logger.success(`Successfully set optimizing status in firebase for ${docPath}, download ${doc.url}`);
        const resp = await axios({
            'method': 'GET',
            'url': doc.url,
            'responseType': 'arraybuffer'
        });
        logger.success(`Image fetched, loading into sharp ${docPath}`);

        step = "loading image into sharp"
        const image = sharp(resp.data);
        logger.success(`Image loaded, processing ${docPath}`);
        logUsage();

        step = "cloning image";
        let large = image.clone(), 
        thumb = image.clone();
        logger.success(`Cloned ${docPath}`);
        logUsage();
        
        // Resize
        step = "resizing image";
        let meta = await image.metadata();
        if(meta.width > 2000 || meta.height > 2000) {
            large = large.resize(2000, 2000, {
                fit: 'inside'
            });
        }
        if(meta.width > 800 || meta.height > 800) {
            thumb = thumb.resize(800, 800, {
                fit: 'inside'
            });
        }
        logger.success(`Resized ${docPath}`);
        
        // Compression and encoding
        step = "encoding images as png";
        logUsage();
        large = large.png();
        thumb = thumb.png();
        logger.success(`Encoded ${docPath}`);
        logUsage();

        // Output to buffer
        step = "rendering web-ready images to buffer"
        const lgBuff = await large.toBuffer();
        const thumbBuff = await thumb.toBuffer();
        logger.success(`Rendered to buffer, preparing for upload ${docPath}`);
        logUsage();
        
        // Construct filename and path for upload
        step = "preparing upload parameters";
        const slug = parentPage.toLowerCase().replace(/ /gi, '-');
        const cappedCaption = doc.caption.length > 150 ? doc.caption.substring(0, 150) : doc.caption;
        const filename = `${cappedCaption ? cappedCaption.toLowerCase().replace(/ /g, '-') : ''}_${docRef.id}`;
        const uploadPath = `/jhdb global/Published/${slug}/images/${filename}`;
        
        step = "uploading web large";
        logger.log(`Uploading webLarge to ${uploadPath} for ${docPath}`);
        const lgUp = await dbx.filesUpload({
            "path": `${uploadPath}-lg.png`,
            "mode": "overwrite",
            "contents": lgBuff
        });
        
        step = "uploading web thumb";
        logger.log(`webLarge done, uploading thumb to ${uploadPath} for ${docPath}`);
        const thumbUp = await dbx.filesUpload({
            "path": `${uploadPath}-thumb.png`,
            "mode": "overwrite",
            "contents": thumbBuff
        });
        logger.success(`Upload success! Updating db for ${uploadPath}`);
        
        step = "updating links in firestore";
        await docRef.update({
            'webLarge': `./images/${filename}-lg.png`,
            'webThumb': `./images/${filename}-thumb.png`,
            'thumbnail': `https://global.jazzhistorydatabase.com/${slug}/images/${filename}-thumb.png`,
            'optimizing': false,
            'optimized': true
        });
        logger.success(`DB update done ${uploadPath}`);
        
        logger.success(`Successfully optimized image ${docPath}`);
        step = "sending response";
        logUsage();
        res.status(200).send([lgUp, thumbUp]);
        logger.success(`Success response sent to client for ${docPath}`);
    } catch(err) {
        logger.error(`Failed optimizing image ${docPath} while ${step}`, err);
        return res.status(500).send(err);
    }
});