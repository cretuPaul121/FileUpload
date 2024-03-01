const  { Sequelize, DataTypes, Op } = require("sequelize");
const { createOneToMany, createManyToMany} = require('./databaseUtils.js');
// models
const UserModel = require('../models/user.js');
const FileModel = require('../models/File.js');
const SharedFilesModel = require('../models/ShareFiles.js');
//connection
const sequelizeConnection = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

let User = UserModel(sequelizeConnection, DataTypes, {
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

let File = FileModel(sequelizeConnection, DataTypes, {
    timestamps: true,
    createdAt: true,
    updatedAt: true
})
// pass parent child
createOneToMany({ key: 'user_id', model: User }, { key: 'file_id', model: File });
// pass parent, child, junction
// createRelationship('manyToMany');
// User.hasMany(File, {
//     foreignKey: {
//         name: 'user_id',
//         type: DataTypes.UUID
//     }
// });
// File.belongsTo(User, {
//     foreignKey: {
//         name: 'file_id',
//         type: DataTypes.UUID
//     }
// });

let SharedFiles = SharedFilesModel(sequelizeConnection, DataTypes, {
    timestamps: true,
    createdAt: true,
    updatedAt: true
}, User, File);

createManyToMany({ key: 'user_id', model: User }, { key: 'file_id', model: File }, SharedFiles);

// User.belongsToMany(File, { through: SharedFiles, foreignKey : { name: 'user_id', type: DataTypes.UUID}});
// File.belongsToMany(User, { through: SharedFiles, foreignKey : { name: 'file_id', type: DataTypes.UUID}});

let database = {
    models: {
        User,
        File,
        SharedFiles
    },
    Sequelize : Sequelize,
    sequelize: sequelizeConnection,
    operator: Op
}

module.exports = database;

