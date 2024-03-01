const express = require('express');
const { getUsers } = require('../controllers/userController.js');
const createUsers = require('../moks/usersMock.js');

const userRouter = express.Router();
// createUsers(3);
userRouter.get('/', getUsers);


module.exports = userRouter;
