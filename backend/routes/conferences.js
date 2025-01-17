import express from 'express';
import { createConference } from '../database/service.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const conference = await createConference(req.body);
    res.status(201).json(conference);
});

export default router;
