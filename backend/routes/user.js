import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user._id,
      name: user.name, // Ensure name is included in the response
      email: user.email,
      picture: user.picture
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
