const express = require('express');
const database = require('./database/sequelizeOrm.js');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter.js');
const fileRouter = require('./routers/fileRouter.js');
const app = express();
// Define the storage location for the uploaded files

// Initialize multer middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// create an auth middleware for json web token auth
// create log in and log out
// the request must contain a bearer token in the header Authorization
app.use('/users', userRouter);
app.use('/', fileRouter);


app.listen(3000, () => {
    database.sequelize.sync({alter: true} );
    console.log('Server started at port 3000');
})