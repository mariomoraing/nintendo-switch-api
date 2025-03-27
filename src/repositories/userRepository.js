const pool = require('../config/database');
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserRepository {
    
    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        return new User(result.insertId, username, hashedPassword);
    }

    async findUserByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return null;
        return new User(rows[0].id, rows[0].username, rows[0].password);
    }

}

module.exports = new UserRepository();