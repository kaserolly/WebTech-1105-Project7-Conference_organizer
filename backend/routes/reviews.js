import express from 'express';
import { submitReview } from '../database/service.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const review = await submitReview(req.body);
    res.status(201).json(review);
});

export default router;
