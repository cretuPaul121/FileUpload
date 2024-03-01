const database = require('../database/sequelizeOrm.js');
const fs = require('fs');
const path = require('path');

// upload a file
async function uploadFile(req, res) {
    const { userId } = req.params;
    const user = await database.models.User.findByPk(userId);
    if(!user)
        return res.json({ status: "failed", error: 'User does not exist'});
    const fileToUpload = req.file;
    if(req['status']) {
        try {
            const fileToSave = await database.models.File.create({
                fileName: fileToUpload.originalname,
                fileType: fileToUpload.mimetype,
                filePath: req.file.path,
                size: fileToUpload.size,
                user_id: userId
            })
            return res.json({ status: "success", message : 'File ' + fileToSave.fileName + 'uploaded successfully' });
        } catch(error) {
            fs.unlinkSync(path.join(__dirname, '..', fileToUpload.filePath));
            return res.json({ status: "failed", error});
        }
    } else {
        return res.json({ status: "failed", error: req['status']['error']})
    }
}
// download a file
async function downloadFile(req, res) {
    const { fileId, userId } = req.params;
    try {
        const file = await database.models.File.findOne({
            where: {
                user_id: userId,
                file_id: fileId
            }
        });
        if(!file)
            return res.json({ status: "failed", error: 'File does not exist'});
        const filePath = path.join(__dirname, '..', file.filePath);
        const dataStream = fs.createReadStream(filePath);
        dataStream.pipe(res);
    } catch(error) {
        res.json({ "status": "failed", error})
    }

}
// retrieve files for an user
async function retrieveFilesForAnUser(req, res) {
    const { userId } = req.params;
    const { limit, offset, fileType, fileName} = req.query;
    const user = await database.models.User.findByPk(userId);
    
    if(!user)
        return res.json({ error: 'Before uploading create an user'});
    let queryObject = {
        where: {
            user_id: userId
        },
        offset: offset,
        limit: limit
    }
    if(fileType) {
        queryObject['where']['fileType'] = {
            [database.operator.like] : '%' + fileType + '%'
        }
    }
    if(fileName) {
        queryObject['where']['fileName'] = {
            [database.operator.like] : '%' + fileName + '%'
        }
    }
    try {
        const files = await database.models.File.findAll(queryObject);
        if(!files || files.length == 0)
            return res.status(204).json({ message: 'No files uploaded'});
        let totalUploadedSize = 0;
        totalUploadedSize = files.reduce((sum, file) => {
            return sum + file.size
        }, totalUploadedSize);
        res.json({
            totalUploadedSize: totalUploadedSize,
            numberOfFiles: files.length,
            files: files
        })
    } catch(error) {
        return res.json({ status: 'failed', error});
    }
}
// retrieve a file for an user
async function retrieveUserFileById(req, res) {
    const { fileId, userId } = req.params;
    const file = await database.models.File.findOne({
        where: {
            user_id: userId,
            file_id: fileId
        }
    });
    if(!file)
        return res.json({ error: 'File does not exist'});
    res.json(file)
}
// delete a file 

async function deleteFileById(req, res) {
    const { userId, fileId} = req.params;
    const fileToDelete = await database.models.File.findByPk(fileId);
    if(fileToDelete) {
        fs.unlink(path.join(__dirname,  ".." ,fileToDelete.filePath), async (err) => {
            console.log(err)
            if(err)
                return res.json({ "status": "file cannot be deleted ", err})
            await database.models.File.destroy({
                where: {
                    file_id: fileId,
                    user_id: userId
                }
            });
            return res.json({ "status": "file  has been deleted" })
        })
    } else {
        return res.json({ "status" : "file does not exist"});
    }
    
}

async function renameFile(req, res) {
    const { userId, fileId } = req.params;
    const { name } = req.body;
    if(name) {
        const fileToUpdate = await database.models.File.findOne({
            where: {
                file_id: fileId,
                user_id: userId
            }
        });
        if(fileToUpdate) {
            const filePath = fileToUpdate.filePath;
            fs.rename(filePath, name, async () => {
                await database.models.File.update({ fileName: name }, {
                    where: {
                        file_id : fileId,
                        user_id: userId
                    }
                })
                res.json({ "status ": "files renamed to " + name});
            })
        } else {
            res.json({ "status": "file does not exist"})
        }
    } else {
        res.json({ "status" : "Please provide a valid name"})
    }
}

//  File Deletion: Allow users to delete files they have previously uploaded. pending on 28/02
//   File Renaming: Allow users to rename files they have uploaded. pending on 28/02
// if a file will be shared with an user : 
// - i need to notify that user,
// - then he can retrieve his file
// - he can retrieve his file as his own


module.exports = {
    uploadFile,
    retrieveFilesForAnUser,
    downloadFile,
    retrieveUserFileById,
    deleteFileById,
    renameFile
}