import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initialize, getUserByUsername, getAllUsers, createUser, updateUser, deleteUser } from './database/service.js';

const app = express();
const PORT = 3001; // Changed port to 3001

app.use(cors());
app.use(bodyParser.json());

initialize().then(() => {
    console.log('Database initialized');
}).catch((error) => {
    console.error('Error initializing database:', error);
});

app.get('/', (req, res) => {
    res.send(`
        <h1>API Endpoints</h1>
        <ul>
            <li>GET /users - Get all users</li>
            <li>GET /users/:username - Get user by username</li>
            <li>POST /users - Create a new user</li>
            <li>PUT /users/:username - Update user by username</li>
            <li>DELETE /users/:username - Delete user by username</li>
        </ul>
    `);
});

app.get('/users/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const user = await createUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/users/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const updatedUser = req.body;
        const user = await updateUser(username, updatedUser);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/users/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await deleteUser(username);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});