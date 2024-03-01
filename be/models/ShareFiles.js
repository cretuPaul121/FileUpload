
module.exports = (sequelize, dataTypes, defaultTableOptions, user, file) => {
    return sequelize.define('SharedFiles', {
        sharedBy: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            references: {
                model: user,
                key: 'user_id'
            }
        },
        file_id: {
            type: dataTypes.INTEGER,
            references: {
                model: file,
                key: 'file_id'
            }
        },
        permission: {
            type: dataTypes.STRING
        }
    }, defaultTableOptions)
}