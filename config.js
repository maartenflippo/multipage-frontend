const path = require('path');

const input = {
    // The directory that holds the javascript files which act as entry 
    // points.
    javascript: path.resolve(__dirname, 'src/javascript/entries'),
};

const output = {
    // The output directory for the javascript bundles.
    javascript: path.resolve(__dirname, 'dist/js'),
};

module.exports = { input, output };