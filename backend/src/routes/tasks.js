const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middlewares/authMiddleware');

// Get all tasks
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE userId = $1', [req.user.id]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *',
            [title, description, req.user.id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a task
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 AND userId = $5 RETURNING *',
            [title, description, isComplete, id, req.user.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND userId = $2 RETURNING *', [id, req.user.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;