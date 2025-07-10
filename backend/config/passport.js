import dotenv from 'dotenv';
dotenv.config(); // Load .env variables ✅

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { id, displayName, emails, photos } = profile;
                const email = emails?.[0]?.value || '';

                // ✅ Check if user exists using either googleId or email
                let user = await User.findOne({
                    $or: [{ googleId: id }, { email }]
                });

                if (!user) {
                    // ✅ Create new user if not found
                    user = await User.create({
                        googleId: id,
                        name: displayName,
                        email,
                        picture: photos?.[0]?.value || ''
                    });
                } else if (!user.googleId) {
                    // ✅ Link Google account if user existed with same email
                    user.googleId = id;
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                console.error("❌ Error in GoogleStrategy:", err);
                return done(err, null);
            }
        }
    )
);

export default passport;
