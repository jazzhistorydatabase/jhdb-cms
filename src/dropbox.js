import dropbox from 'dropbox';

const dbx = {

    // Must be called in componentWillMount in App.js
    initialize: function (callback) {
        var config = {
            appKey: "l3bfhq15xjjtxqp",
            clientId: "jhbdlvkjabsdkljvna",
            clientSecret: "t523msf8d0pr610",
            redirectUri: "http://localhost:3000/"
        };
        let accessToken = this.getAccessTokenFromUrl();
        if (!accessToken) {
            window.location.href = "http://dropbox.com/oauth2/authorize?client_id=" + config.appKey + "&response_type=token&redirect_uri=" + window.location.href;
        } else  {
            config.accessToken = accessToken;
            this.app = new dropbox.Dropbox(config);
        }
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
    }

}

export default dbx;