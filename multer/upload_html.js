const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/upload');
        },
        filename: (req, file, callback) => {
            callback(null, 'archive_html');
        },
    }),
    fileFilter: (req, file, callback) => {
        const extension = ['text/html'].find(format => format === file.mimetype);

        if(extension) {
            return callback(null, true);
        }

        return callback(null, false);
    }
}));