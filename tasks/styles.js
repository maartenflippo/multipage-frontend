const path = require('path');
const { src, dest } = require('gulp');
const { input, output } = require('../config');

const styles = () => {

    const stream = src(path.resolve(input.styles.directory, '**.*'));

    if (!!input.styles.preprocessor) {
        stream.pipe(input.styles.preprocessor);
    }

    stream.pipe(dest(output.styles));

    return stream;  
};

module.exports = styles;