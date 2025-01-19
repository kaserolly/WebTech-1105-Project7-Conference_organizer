import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getUserByUsername,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllConferences,
    createConference,
    updateConference,
    deleteConference,
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle
} from './database/service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the OpenAPI YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send(`
        <h1>API Endpoints</h1>
        <ul>
            <li>GET /users - Get all users</li>
            <li>GET /users/:username - Get user by username</li>
            <li>POST /users - Create a new user</li>
            <li>PUT /users/:id - Update user by ID</li>
            <li>DELETE /users/:id - Delete user by ID</li>
            <li>GET /conferences - Get all conferences</li>
            <li>POST /conferences - Create a new conference</li>
            <li>PUT /conferences/:id - Update conference by ID</li>
            <li>DELETE /conferences/:id - Delete conference by ID</li>
            <li>GET /articles - Get all articles</li>
            <li>POST /articles - Submit a new article</li>
            <li>PUT /articles/:id - Update article by ID</li>
            <li>DELETE /articles/:id - Delete article by ID</li>
            <li><a href="/api-docs">API Documentation</a></li>
        </ul>
    `);
});

// User routes
app.get('/users', async (req, res) => {
    const { username } = req.query;
    if (username) {
        try {
            const user = await getUserByUsername(username);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    } else {
        try {
            const users = await getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }
});

app.post('/users', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await deleteUser(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Conference routes
app.get('/conferences', async (req, res) => {
    try {
        const conferences = await getAllConferences();
        res.json(conferences);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conferences' });
    }
});

app.post('/conferences', async (req, res) => {
    try {
        const newConference = await createConference(req.body);
        res.status(201).json(newConference);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create conference' });
    }
});

app.put('/conferences/:id', async (req, res) => {
    try {
        const updatedConference = await updateConference(req.params.id, req.body);
        if (updatedConference) {
            res.status(200).json(updatedConference);
        } else {
            res.status(404).json({ error: 'Conference not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update conference' });
    }
});

app.delete('/conferences/:id', async (req, res) => {
    try {
        const deletedConference = await deleteConference(req.params.id);
        if (deletedConference) {
            res.status(200).json({ message: 'Conference deleted successfully' });
        } else {
            res.status(404).json({ error: 'Conference not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete conference' });
    }
});

// Article routes
app.get('/articles', async (req, res) => {
    try {
        const articles = await getAllArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

app.post('/articles', async (req, res) => {
    try {
        const newArticle = await createArticle(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit article' });
    }
});

app.put('/articles/:id', async (req, res) => {
    try {
        const updatedArticle = await updateArticle(req.params.id, req.body);
        if (updatedArticle) {
            res.status(200).json(updatedArticle);
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update article' });
    }
});

app.delete('/articles/:id', async (req, res) => {
    try {
        const deletedArticle = await deleteArticle(req.params.id);
        if (deletedArticle) {
            res.status(200).json({ message: 'Article deleted successfully' });
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete article' });
    }
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});