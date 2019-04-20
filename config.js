const path = require('path');

const input = {
    // The directory that holds the javascript files which act as entry 
    // points.
    javascript: path.resolve(__dirname, 'src/javascript/entries'),

    styles: {
        // The input to the style build. Can be an array. If the path is a file,
        // the file will be input, if the path is a directory, all files within
        // that directory will be input.
        files: path.resolve(__dirname, 'src/styles'),

        // The preprocessor used for the styles. If null, no preprocessor will
        // be used.
        preprocessor: null,
    },
};

const output = {
    // The output directory for the javascript bundles.
    javascript: path.resolve(__dirname, 'dist/js'),

    // The output directory for the style files.
    styles: path.resolve(__dirname, 'dist/css'),
};

module.exports = { input, output };