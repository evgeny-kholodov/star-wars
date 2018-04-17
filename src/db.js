var mongoose = require('mongoose');

export default callback => {
    // connect to a database if needed, then pass it to `callback`:
    mongoose.connect('mongodb://localhost/planetApp', {}).then(
        () => {
            /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
            callback();
        },

        err => { /** handle initial connection error */
            throw Error('Can\'t connect to database');
        }
    );
}
