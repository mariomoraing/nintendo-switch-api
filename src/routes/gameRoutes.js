const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { validateGameData, checkPublisher, validateId } = require('../middlewares/validationMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/games', gameController.getAllGames);
router.get('/game/:id', gameController.getGameById);
router.post('/games', authenticateToken, [validateGameData, checkPublisher], gameController.createGame);
router.put('/games/:id', authenticateToken, [validateId, validateGameData, checkPublisher], gameController.updateGame);
router.delete('/games/:id', authenticateToken, validateId, gameController.deleteGame);

module.exports = router;