const del = require('del');
const { output } = require('../config');

const clean = () => {
    return del([
        output.javascript,
        output.styles
    ], { force: true });
};

module.exports = clean;