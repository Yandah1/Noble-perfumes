const expressJwt = require('express-jwt');
const secret = process.env.secret;

const authJwt = expressJwt({
        secret: secret,
        algorithms: ['HS256']
    });

module.exports = authJwt;