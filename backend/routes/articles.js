import express from 'express';
import { submitArticle } from '../database/service.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const article = await submitArticle(req.body);
    res.status(201).json(article);
});

export default router;
