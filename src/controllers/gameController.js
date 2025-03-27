const gameService = require('../services/gameService');

class GameController {
    async getAllGames(req, res) {
        try {
            const games = await gameService.getAllGames();
            res.json(games);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getGameById(req, res) {
        try {
            const game = await gameService.getGameById(req.params.id);
            res.json(game);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }

    async createGame(req, res) {
        try {
            const game = await gameService.createGame(req.body);
            res.status(201).json(game);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async updateGame(req, res) {
        try {
            const game = await gameService.updateGame(req.params.id, req.body);
            res.json(game);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteGame(req, res) {
        try {
            await gameService.deleteGame(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new GameController();