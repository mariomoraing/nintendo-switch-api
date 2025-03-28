const pool = require('../config/database');
const Game = require('../models/game');

class GameRepository {
    async getAllGames() {
        const { rows } = await pool.query('SELECT * FROM games');
        return rows.map(row => new Game(row.id, row.title, row.genre, row.release_date, row.publisher));
    }

    async getGameById(id) {
        const { rows } = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
        if (rows.length === 0) return null;
        return new Game(rows[0].id, rows[0].title, rows[0].genre, rows[0].release_date, rows[0].publisher);
    }

    async createGame(game) {
        const { rows } = await pool.query(
            'INSERT INTO games (title, genre, release_date, publisher) VALUES ($1, $2, $3, $4) RETURNING *',
            [game.title, game.genre, game.release_date, game.publisher]
        );
        return new Game(rows[0].id, rows[0].title, rows[0].genre, rows[0].release_date, rows[0].publisher);
    }

    async updateGame(id, gameData) {
        const { rows } = await pool.query(
            'UPDATE games SET title = $1, genre = $2, release_date = $3, publisher = $4 WHERE id = $5 RETURNING *',
            [gameData.title, gameData.genre, gameData.release_date, gameData.publisher, id]
        );
        if (rows.length === 0) return null;
        return new Game(rows[0].id, rows[0].title, rows[0].genre, rows[0].release_date, rows[0].publisher);
    }

    async deleteGame(id) {
        const { rowCount } = await pool.query('DELETE FROM games WHERE id = $1', [id]);
        return rowCount > 0;
    }
}

module.exports = new GameRepository();