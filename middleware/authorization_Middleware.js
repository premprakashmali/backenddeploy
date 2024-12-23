const jwt = require('jsonwebtoken');
const jwtSecretKey = "a4df7637-6d7b-49a6-b5c1-dc5041d175f5"


exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, jwtSecretKey, (err, authData) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }

            req.authData = authData;
            next()

        })
    }
    catch (err) {
        console.err("Token error", err);
        return res.status(500).json({ message: 'Internal server error' });
    }


}


