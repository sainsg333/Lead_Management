const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const tokenParts = token.split(' '); 
        if (tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Token format is incorrect' });
        }

        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        req.user = decoded.user;


        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
