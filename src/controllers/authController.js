const authService = require('../services/authService');

class AuthController {

    async register(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authService.register(username, password);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

}

module.exports = new AuthController();