import dropbox from 'dropbox';
import loadScript from 'load-script';

const DROPBOX_SDK_URL = 'https://www.dropbox.com/static/api/2/dropins.js';
const SCRIPT_ID = 'dropboxjs';

let scriptLoadingStarted = false;


const dbx = {

    // Must be called in componentWillMount in App.js
    initialize: function (callback) {
        let config = {
            appKey: "l3bfhq15xjjtxqp",
            redirectUri: "http://localhost:3000/"
        };
        let accessToken = this.getAccessTokenFromUrl();
        if (!accessToken) {
            window.location.href = "http://dropbox.com/oauth2/authorize?client_id=" + config.appKey + "&response_type=token&redirect_uri=" + window.location.href;
        } else  {
            config.accessToken = accessToken;
            this.app = new dropbox.Dropbox(config);
            if (!this.isDropboxReady() && !scriptLoadingStarted) {
                scriptLoadingStarted = true;
                loadScript(DROPBOX_SDK_URL, {
                  attrs : {
                    id: SCRIPT_ID,
                    'data-app-key': config.appKey
                  }
                });
              }
        }
    },

    isDropboxReady() {
        return !!window.Dropbox;
    },

    onChoose(fileType, successCallback) {
        if (!this.isDropboxReady() || !successCallback || (fileType !== 'Images' && fileType !== 'Audio')) return null;
        let options;
        if (fileType === 'Images') options = this.dbxImageOptions;
        else if (fileType === 'Audio') options = this.dbxAudioOptions;
        options.success = successCallback;
        window.Dropbox.choose(options);
    },

    getAccessTokenFromCode: function (redirectUri, code) {
        this.app.getAccessTokenFromCode(redirectUri, code)
            .catch(function(error) {
                console.log(error);
            });
    },

     // Parses the url and gets the access token if it is in the urls hash
    getAccessTokenFromUrl: function () {
        return this.getTokenFromRedirectUrl(window.location.hash);
    },

    isAuthenticated: function () {
        return !!this.getAccessTokenFromUrl();
    },

    openFile: function (fileName) {
        window.location.href = "https://www.dropbox.com/home?preview=" + fileName;
    },

    getTokenFromRedirectUrl: function (str) {
        const params = new URLSearchParams(str);
        return params.get('#access_token');
    },

    dbxImageOptions: {
        success: null,
        cancel: null,
        linkType: "preview", // or "direct"
        multiselect: false,
        extensions: ['images'],
        folderselect: false,
        sizeLimit: 1024 * 1024 * 1024, // in bytes
    },
    
    dbxAudioOptions: {
        success: null,
        cancel: null,
        linkType: "preview", // or "direct"
        multiselect: false,
        extensions: ['audio'],
        folderselect: false,
        sizeLimit: 1024 * 1024 * 1024, // in bytes
    },
}

export default dbx;