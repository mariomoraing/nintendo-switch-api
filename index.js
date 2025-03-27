require('dotenv').config();
const express = require('express');
const gameRoutes = require('./src/routes/gameRoutes');
const authRoutes = require('./src/routes/authRoutes');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', gameRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});