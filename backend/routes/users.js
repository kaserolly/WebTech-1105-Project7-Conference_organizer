import express from 'express';
import { getAllUsers, getUserByUsername, createUser, updateUser, deleteUser } from '../database/service.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await getAllUsers());
});

router.get('/:username', async (req, res) => {
    const user = await getUserByUsername(req.params.username);
    if (!user) return res.status(404).send({ error: 'User not found' });
    res.json(user);
});

router.post('/', async (req, res) => {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
});

router.put('/:username', async (req, res) => {
    const updatedUser = await updateUser(req.params.username, req.body);
    if (!updatedUser) return res.status(404).send({ error: 'User not found' });
    res.json(updatedUser);
});

router.delete('/:username', async (req, res) => {
    const result = await deleteUser(req.params.username);
    if (!result) return res.status(404).send({ error: 'User not found' });
    res.json({ message: 'User deleted' });
});

export default router;
