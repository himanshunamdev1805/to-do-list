const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'todolist'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware to parse JSON request body
app.use(express.json());

// GET all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(result);
  });
});

// POST new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  const sql = 'INSERT INTO tasks (task) VALUES (?)';
  db.query(sql, [task], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ id: result.insertId, task });
  });
});

// DELETE task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [taskId], err => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.sendStatus(204); // No Content
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
