const prisma = require('../config/prisma');
const Game = require('../models/game');

class GameRepository {

    async getAllGames() {
        const games = await prisma.games.findMany();
        return games.map(game => new Game(game.id, game.title, game.genre, game.release_date, game.publisher));
    }

    async getGameById(id) {
        const game = await prisma.games.findUnique({
            where: { id: parseInt(id) }
        });

        if (!game) return null;
        return new Game(game.id, game.title, game.genre, game.releaseDate, game.publisher);
    }

    async createGame(game) {
        const newGame = await prisma.games.create({
            data: {
                title: game.title,
                genre: game.genre,
                release_date: game.release_date ? new Date(game.release_date) : null,
                publisher: game.publisher
            }
        });
        return new Game(newGame.id, newGame.title, newGame.genre, newGame.releaseDate, newGame.publisher);
    }

    async updateGame(id, gameData) {
        const updatedGame = await prisma.games.update({
            where: { id: parseInt(id) },
            data: {
                title: gameData.title,
                genre: gameData.genre,
                release_date: gameData.release_date ? new Date(gameData.release_date) : null,
                publisher: gameData.publisher
            }
        });
        return new Game(updatedGame.id, updatedGame.title, updatedGame.genre, updatedGame.releaseDate, updatedGame.publisher);
    }

    async deleteGame(id) {
        await prisma.games.delete({
            where: { id: parseInt(id) }
        });
        return true;
    }
}

module.exports = new GameRepository();