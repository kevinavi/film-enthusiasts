import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { configureServices } from './config/apiConfig.js';
import moviesRoute from './routes/movies.js';

const app = express();
config();
configureServices();

// app.use(express.json({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use routes after cors
app.use(moviesRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});