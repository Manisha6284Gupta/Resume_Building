// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/db.js";
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = 4000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', userRouter)

// Routes
app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
