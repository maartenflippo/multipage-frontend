const path = require('path');
const fs = require('fs');
const util = require('util');
const { src, dest } = require('gulp');
const { input, output } = require('../config');

const stat = util.promisify(fs.stat);

/**
 * Parse an array of paths to either globs of all files if a path is a directory,
 * or that file if the path is a file.
 * 
 * @param {string|string[]} paths
 * @returns {Promise<string[]>}
 */
const parseInput = async (paths) => {

    const result = [];

    if (!Array.isArray(paths)) {
        paths = [paths];
    }

    const parsings = paths.map(async p => {
        if ((await stat(p)).isDirectory()) {
            result.push(path.resolve(p, '**/*.*'));
        } else {
            result.push(p);
        }
    });

    await Promise.all(parsings);

    return result;
};

const styles = async () => {

    const files = await parseInput(input.styles.files);

    const stream = src(files);

    if (!!input.styles.preprocessor) {
        stream.pipe(input.styles.preprocessor);
    }

    stream.pipe(dest(output.styles));

    return stream;  
};

module.exports = styles;