const database = require('../database/sequelizeOrm.js');

async function createUsers(numbersOfUsers) {
    let users = [];
    for(let i = 0; i < numbersOfUsers; i++) {
        users.push({
            username: 'my username' + i,
            email : 'email' + i,
            token: 'token'
        });
    }
    const usersToCreate = await database.models.User.bulkCreate(users);
    console.log('created ' + usersToCreate)
    return usersToCreate;
}

module.exports = createUsers;
