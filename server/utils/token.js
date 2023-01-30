const jwt = require ('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '1d', algorithm: 'RS256' });
};

const validateToken = (token) => {
    return jwt.verify(token, process.env.PUBLIC_KEY);
};

module.exports = {
    generateToken,
    validateToken
};