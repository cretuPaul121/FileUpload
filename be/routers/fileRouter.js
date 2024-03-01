const { retrieveFilesForAnUser, uploadFile, downloadFile,
        retrieveUserFileById, deleteFileById, renameFile} = require('../controllers/fileController.js');
const fileRouter = require('express').Router();
const uploadMiddleware = require('../fileStorage/storage.js');

fileRouter.get('/users/:userId/files', retrieveFilesForAnUser);
fileRouter.post('/users/:userId/upload', uploadMiddleware.single('file'), uploadFile);
fileRouter.get('/users/:userId/download/:fileId', downloadFile);
fileRouter.get('/users/:userId/files/:fileId', retrieveUserFileById);
fileRouter.delete("/users/:userId/files/:fileId", deleteFileById);
fileRouter.patch("/users/:userId/files/:fileId", renameFile);


module.exports = fileRouter;