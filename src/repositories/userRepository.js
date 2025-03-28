const pool = require('../config/database');
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserRepository {

    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        return new User(rows[0].id, rows[0].username, rows[0].password);
    }

    async findUserByUsername(username) {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (rows.length === 0) return null;
        return new User(rows[0].id, rows[0].username, rows[0].password);
    }

    async countUsers(){
        const { rows } = await pool.query('SELECT count(*) FROM users');
        return parseInt(rows[0].count, 10);        
    }
}

module.exports = new UserRepository();