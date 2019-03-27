import dropbox from 'dropbox';

const dbx = {

    // Must be bound to component — ie call initialize.bind(this)(callback) from App.componentWillMount()
    initialize: function (callback) {
        var config = {
            accessToken: "MnliSZfDR6AAAAAAAAAArtG4qF-XIjyL_DP9FpSfmRqPdTmQtTSwHwkwBQs9Ycxs",
            clientId: "jhbdlvkjabsdkljvna",
            clientSecret: "t523msf8d0pr610",
            redirectUri: "http://localhost:3000/"
        };
        this.app = new dropbox.Dropbox(config);
        this.app.authUrl = this.app.getAuthenticationUrl("http://localhost:3000/", null, 'code');
    },

    getAccessTokenFromCode: function (redirectUri, code) {
        this.app.getAccessTokenFromCode(redirectUri, code)
            .then(function(token) {
                console.log(token);
            })
            .catch(function(error) {
                console.log(error);
            });
    },

     // Parses the url and gets the access token if it is in the urls hash
    getAccessTokenFromUrl: function () {
        return parseQueryString(window.location.hash).access_token;
    }

}

function parseQueryString(str) {
    var ret = Object.create(null);

    if (typeof str !== 'string') {
        return ret;
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
        return ret;
    }

    str.split('&').forEach(function (param) {
        var parts = param.replace(/\+/g, ' ').split('=');
        // Firefox (pre 40) decodes `%3D` to `=`
        // https://github.com/sindresorhus/query-string/pull/37
        var key = parts.shift();
        var val = parts.length > 0 ? parts.join('=') : undefined;

        key = decodeURIComponent(key);

        // missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        val = val === undefined ? null : decodeURIComponent(val);

        if (ret[key] === undefined) {
            ret[key] = val;
        } else if (Array.isArray(ret[key])) {
            ret[key].push(val);
        } else {
            ret[key] = [ret[key], val];
        }
    });

    return ret;
}

export default dbx;