const mode = require('gulp-mode');

const environment = mode({
    modes: ['production', 'development'],
    default: 'production',
    verbose: false
});

// Determine the current environment
const production = environment.production();

module.exports = {
    production,
    development: !production
};