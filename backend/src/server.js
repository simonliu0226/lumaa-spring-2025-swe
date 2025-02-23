require('dotenv').config()
const express = require('express');
const cors = require('cors');

const server = express();
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Use JSON
server.use(express.json());

// Enable CORS
server.use(cors());

// Routes
server.use('/auth', authRoutes);
server.use('/tasks', taskRoutes);

// Listen
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});