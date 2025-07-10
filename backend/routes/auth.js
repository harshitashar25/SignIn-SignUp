import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

router.get('/google/callback', passport.authenticate('google', { session: false }), async (req, res) => {
  const { id, displayName, email, picture } = req.user;
  console.log('Google profile:', req.user); // Debug: log the Google profile

  if (!email) {
    // If no email, redirect to frontend with error
    return res.redirect(`${process.env.FRONTEND_URL}?error=NoEmailProvided`);
  }

  // Use findOneAndUpdate with upsert to avoid dual registration and fix conflicting update
  let user = await User.findOneAndUpdate(
    { $or: [{ googleId: id }, { email: email }] },
    {
      $set: {
        googleId: id,
        name: displayName,
        email: email,
        picture: picture
      }
    },
    { new: true, upsert: true }
  );

  // Check if user exists in DB before issuing JWT
  const dbUser = await User.findById(user._id);
  if (!dbUser) {
    return res.redirect(`${process.env.FRONTEND_URL}?error=UserNotFound`);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
});

export default router;
