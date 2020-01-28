import loadScript from 'load-script';
import clientConfig from './client-creds.json';

const DROPBOX_SDK_URL = 'https://www.dropbox.com/static/api/2/dropins.js';
const SCRIPT_ID = 'dropboxjs';

let scriptLoadingStarted = false;


const dbx = {
    // Must be called in componentWillMount in App.js
    initialize: function (callback) {
        const dbconf = clientConfig.dropboxConfig;
        if (!this.isDropboxReady() && !scriptLoadingStarted) {
            scriptLoadingStarted = true;
            loadScript(DROPBOX_SDK_URL, {
                attrs : {
                id: SCRIPT_ID,
                'data-app-key': dbconf.appKey
                }
            });
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

    onChooseMulti(fileType, successCallback) {
        if (!this.isDropboxReady() || !successCallback || (fileType !== 'Images' && fileType !== 'Audio')) return null;
        let options;
        if (fileType === 'Images') options = this.dbxImageOptions;
        else if (fileType === 'Audio') options = this.dbxAudioOptions;
        options.success = successCallback;
        options.multiselect = true;
        window.Dropbox.choose(options);
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