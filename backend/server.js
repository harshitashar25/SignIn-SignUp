import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import net from 'net';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running');
});
app.use('/auth', authRoutes);
app.use('/api', userRoutes);

// Check Port Availability
const checkPortAvailability = (port, callback) => {
  const server = net.createServer();
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      callback(false);
    }
  });
  server.once('listening', () => {
    server.close();
    callback(true);
  });
  server.listen(port);
};

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});