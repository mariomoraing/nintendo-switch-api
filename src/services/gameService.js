const gameRepository = require('../repositories/gameRepository');
const GameDTO = require('../dtos/gameDTO');

class GameService {
    async getAllGames() {
        const games = await gameRepository.getAllGames();
        return games.map(game => new GameDTO(game));
    }

    async getGameById(id) {
        const game = await gameRepository.getGameById(id);
        if(!game) throw new Error('Game not found');
        return new GameDTO(game);
    }

    async createGame(gameData) {
        const game = await gameRepository.createGame(gameData);
        return new GameDTO(game);
    }

    async updateGame(id, gameData) {
        const game = await gameRepository.updateGame(id, gameData);
        if (!game) throw new Error('Game not found');
        return new GameDTO(game);
    }

    async deleteGame(id) {
        const deleted = await gameRepository.deleteGame(id);
        if (!deleted) throw new Error('Game not found');
        return true;
    }
}

module.exports = new GameService();