const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    if (req.headers.token) {
        const token = req.headers.token.split(" ")[1];

        jwt.verify(token,
            process.env.SECRET_KEY,
            (err, user) => {
                if (err) res.status(403).send("Invalid token");
                req.user = user;
                next();
            })    
    } else {
        return res.status(401).json("You are not authenticated");
    }
}

module.exports = verifyJWT;