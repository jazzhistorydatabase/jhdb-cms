const colors = require('colors');

const timestamp = () => {
    let x = new Date();
    return x.toISOString();
}

exports.log = (msg) => {
    console.log(`${timestamp().bold} ${msg}`.white);
}

exports.info = (msg) => {
    console.log(`${timestamp().bold} ${msg}`.blue);
}

exports.success = (msg) => {
    console.log(`${timestamp().bold} ${msg}`.green);
}

exports.error = (msg, err) => {
    console.log(`${timestamp().bold} ${msg}`.red);
    if(err) {
        console.log(`${JSON.stringify(err)}`.grey);
    }
}
exports.err = exports.error;

exports.highlight = (msg) => {
    console.log(`${timestamp().bold} ${msg}`.bgMagenta);
}