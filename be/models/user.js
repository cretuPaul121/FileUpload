
module.exports = (sequelize, dataTypes, defaultTableOptions) => {
    return sequelize.define('User', {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: dataTypes.STRING,
        email: dataTypes.STRING,
        token: dataTypes.STRING
    },
    defaultTableOptions );
}
