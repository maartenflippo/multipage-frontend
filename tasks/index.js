const { series, parallel } = require('gulp');
const scripts = require('./scripts');
const styles = require('./styles');

exports.scripts = series(scripts);
exports.styles = series(styles);

exports.build = parallel(exports.scripts, exports.styles);

exports.default = exports.build;