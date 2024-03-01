
module.exports = (sequelize, dataTypes, defaultTableOptions) => {
    return sequelize.define('File', {
        file_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fileName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        fileType: {
            type: dataTypes.STRING
        },
        filePath: {
            type: dataTypes.STRING
        },
        size: {
            type: dataTypes.INTEGER
        }
    }, defaultTableOptions)
}
