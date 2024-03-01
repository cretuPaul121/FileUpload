const database = require('../database/sequelizeOrm.js');

async function getUsers(req, res) {
    const users = await database.models.User.findAll();
    return res.json({ users: users });
}

module.exports = {
    getUsers
}
