const pool = require('../config/database');
const Game = require('../models/game');

class GameRepository {
    async getAllGames() {
        const [rows] = await pool.query('SELECT * FROM games');
        return rows.map(row => new Game(row.id, row.title, row.genre, row.release_date, row.publisher));
    }

    async getGameById(id) {
        const [rows] = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if(rows.length === 0) return null;
        return new Game(rows[0].id, rows[0].title, rows[0].genre, rows[0].release_date, rows[0].publisher);
    }

    async createGame(game) {
        const [result] = await pool.query(
            'INSERT INTO games (title, genre, release_date, publisher) VALUES (?, ?, ?, ?)',
            [game.title, game.genre, game.release_date, game.publisher]
        );
        return new Game(result.insertId, game.title, game.genre, game.release_date, game.publisher);
    }

    async updateGame(id, gameData) {
        const [result] = await pool.query(
            'UPDATE games SET title = ?, genre = ?, release_date = ?, publisher = ? WHERE id = ?',
            [gameData.title, gameData.genre, gameData.release_date, gameData.publisher, id]
        );
        if (result.affectedRows === 0) return null;
        return new Game(id, gameData.title, gameData.genre, gameData.release_date, gameData.publisher);
    }

    async deleteGame(id) {
        const [result] = await pool.query('DELETE FROM games WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

}

module.exports = new GameRepository();