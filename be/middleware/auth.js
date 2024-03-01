const jwt = require('jsonwebtoken');
const SECRET_KEY  = 'ThiIsSecretKey';

const authenticateToken = (req, res, next) => {

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err)
            return res.status(403).json({ error: 'Invalid Token'})
        req.user = user;
        console.log('user is ', user);
        return next();
    });
}

module.exports = authenticateToken;