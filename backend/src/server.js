require('dotenv').config()
const express = require('express');
const server = express();
const pool = require('./config/db');
const authRoutes = require('./routes/auth');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

server.get('/testdb', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT NOW()');
        res.send(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

server.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

