import express from 'express';
import moviesController from '../controllers/moviesController.js'

const router = express.Router();

router.get('/top-10-movies', moviesController);

export default router;