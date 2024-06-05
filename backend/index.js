const express = require('express');
const storage = require('node-persist');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize storage
(async () => {
    await storage.init();
    await storage.clear(); // Clear old data on restart
})();

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await storage.getItem('tasks') || [];
    res.json(tasks);
});

// Add a new task
app.post('/tasks', async (req, res) => {
    const tasks = await storage.getItem('tasks') || [];
    tasks.push(req.body.task);
    await storage.setItem('tasks', tasks);
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
