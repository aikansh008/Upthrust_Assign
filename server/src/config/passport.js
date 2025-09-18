const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models');

// GitHub OAuth strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/github/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists in our db
    let user = await User.findOne({ where: { githubId: profile.id } });
    
    if (user) {
      return done(null, user);
    }
    
    // If not, create a new user
    user = await User.create({
      githubId: profile.id,
      username: profile.username,
      email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
      avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
      displayName: profile.displayName || profile.username,
      accessToken
    });
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize user for session storage
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;