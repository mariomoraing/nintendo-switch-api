const { body, param, validationResult } = require('express-validator');

// Middleware hecho con funcionalidades de express-validator
const validateGameData = [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('genre').optional().isString().withMessage('El género debe ser un texto'),
    body('release_date').isISO8601().withMessage('La fecha debe estar en formato YYYY-MM-DD'),
    body('publisher').notEmpty().withMessage('El publicador es obligatorio'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware personalizado: verifica publishers válidos
const validPublishers = ['Nintendo', 'Capcom', 'Square Enix', 'Bandai Namco'];
const checkPublisher = (req, res, next) => {
    const { publisher } = req.body;
    if (!validPublishers.includes(publisher)) {
        return res.status(400).json({ message: `El publicador '${publisher}' no está permitido. Opciones válidas: ${validPublishers.join(', ')}` });
    }
    next();
};

// Middleware para el método PUT hecho con express-validator
const validateId = [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateGameData, checkPublisher, validateId };