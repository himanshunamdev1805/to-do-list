import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const addTask = () => {
        if (task.trim()) {
            axios.post('http://localhost:5000/tasks', { task })
                .then(response => {
                    setTasks(response.data);
                    setTask('');
                })
                .catch(error => console.error('Error adding task:', error));
        }
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="Enter the task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>{t}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
