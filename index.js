require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const swaggerui = require('swagger-ui-express');
const yaml = require('yamljs');

const swaggerDocument = yaml.load('./swagger.yaml');

const gameRoutes = require('./src/routes/gameRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet({
    contentSecurityPolicy: false, 
    hsts: {
        maxAge: 31536000, // 1 año en segundos
        includeSubDomains: true,
        preload: true
    },
    frameguard: {
        action: 'deny' // Evita que la API sea embebida en iframes
    }
}));


app.use(express.json());
app.use('/api', gameRoutes);
app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});