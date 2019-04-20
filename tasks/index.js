const { series, parallel } = require('gulp');
const scripts = require('./scripts');
const styles = require('./styles');
const clean = require('./clean');

exports.scripts = series(scripts);
exports.styles = series(styles);
exports.clean = series(clean);

exports.build = parallel(exports.scripts, exports.styles);

exports.default = exports.build;