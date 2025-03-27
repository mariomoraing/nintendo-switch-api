const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido o expirado' });
        req.user = user; // Agrega el usuario decodificado al request
        next();
    });
};

module.exports = { authenticateToken };