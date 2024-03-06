require('dotenv').config();

const jwt = require('jsonwebtoken');

function authJwt(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); // Unauthorized if no token provided
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user; // Attach user object to request
        next();
    });
}

module.exports = authJwt;
