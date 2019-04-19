const { series } = require('gulp');
const scripts = require('./scripts');

exports.scripts = series(scripts);
exports.default = exports.scripts;