const fs = require('fs');
const util = require('util');
const path = require('path');
const webpack = require('webpack');
const env = require('./environment');
const { input, output } = require('../config');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const entries = async () => {
    const listFiles = async (basePath, namePrefix = '') => {
        const files = await readdir(basePath);
        let entryMap = {};

        const mappings = files.map(async file => {
            const newPath = path.resolve(basePath, file);
            const stats = await stat(newPath);

            if (stats.isDirectory()) {
                const nested = await listFiles(newPath, file + path.sep);
                entryMap = { ...entryMap, ...nested };
            } else {
                const filename = file.substring(0, file.length - 3);
                entryMap = { ...entryMap, [namePrefix + filename]: newPath };
            }
        });

        await Promise.all(mappings);

        return entryMap;
    };

    return await listFiles(input.javascript);
};

// The webpack compiler configuration object.
const config = {
    mode: env.production ? 'production' : 'development',

    entry: entries,

    output: {
        path: output.javascript,
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }
};

const scripts = () => {
    return new Promise(resolve => webpack(config, (err, stats) => {
        if (err) {
            console.log('Webpack', err);
        }

        console.log(stats.toString({
            colors: true
        }));

        resolve();
    }));
};

module.exports = scripts;