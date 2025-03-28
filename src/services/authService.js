const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/auth');

class AuthService {

    async register(username, password) {

        const maxUsers = parseInt(process.env.MAX_USERS, 10) || 50;
        const userCount = await userRepository.countUsers();

        if (userCount >= maxUsers) {
            throw new Error('Se ha alcanzado el límite máximo de usuarios registrados');
        }

        const existingUser = await userRepository.findUserByUsername(username);
        if (existingUser) throw new Error('El usuario ya existe');
        
        const user = await userRepository.createUser(username, password);
        return { user: { id: user.id, username: user.username }, token: generateToken(user) };
    }

    async login(username, password) {
        const user = await userRepository.findUserByUsername(username);
        if (!user) throw new Error('Usuario no encontrado');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Contraseña incorrecta');
        return { user: { id: user.id, username: user.username }, token: generateToken(user) };
    }

}

module.exports = new AuthService();