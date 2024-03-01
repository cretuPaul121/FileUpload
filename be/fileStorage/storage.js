const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        const { userId } = req.params;
        const path = "./uploads/user" + userId;
        try {
            fs.mkdirSync(path, { recursive: true});
            cb(null, path)
            req["status"] = { success: true }
        } catch(error) {
            req["status" ] = { success: false, error}
        }
    },
    
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split('/');
        cb(null, 'user' + req.params['userId'] + Date.now() + file.originalname)
    }
});

const uploadMiddleware = multer({ storage : storage});

module.exports = uploadMiddleware;