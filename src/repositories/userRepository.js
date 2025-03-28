const prisma = require('../config/prisma');
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserRepository {

    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        return new User(user.id, user.username, user.password);
    }

    async findUserByUsername(username) {
        const user = await prisma.users.findUnique({
            where: { username }
        });
        if (!user) return null;
        return new User(user.id, user.username, user.password);
    }

    async countUsers(){
        return await prisma.users.count();       
    }
}

module.exports = new UserRepository();