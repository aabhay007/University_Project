import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "",
      clientSecret: "",
      callbackURL: "http://localhost:8085/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await UserModel.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user);
        } else {
          const newUser = new UserModel({
            email: profile.emails[0].value,
            password: "1234",
            firstname: profile.displayName,
            image: profile.photos[0].value,
          });

          let savedUser = await newUser.save();
          return done(null, savedUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

export const googleAuthCallbackHandler = (req, res) => {
  // Check if the logout flag is set in the session or request
  // if (!req.session.shouldSendUserData) {
  //   // If the flag is not set, do not send user data
  //   res.redirect("http://localhost:3000/");
  //   return;
  // }

  // If the flag is set, proceed to send user data
  const user = req.user;
  const profilee = req.profile;
  res.redirect(
    `http://localhost:3000/?username=${user.email}&picture=${user.image}`
  );
};

export const logoutuser = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    // Clear session cookie
    res.clearCookie("connect.sid");
    // Redirect to homepage
    res.redirect("http://localhost:3000/");
  });
};

//facebook

import { Strategy as FacebookStrategy } from "passport-facebook";

passport.use(
  new FacebookStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:8085/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"], // Specify the fields you want to retrieve from Facebook
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await UserModel.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user);
        } else {
          const newUser = new UserModel({
            email: profile.emails[0].value,
            password: "1234",
            firstname: profile.displayName,
            image: profile.photos[0].value,
          });
          let savedUser = await newUser.save();
          return done(null, savedUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

export const facebookAuth = passport.authenticate("facebook", {
  scope: ["email"],
});

export const facebookAuthCallback = passport.authenticate("facebook", {
  failureRedirect: "/login",
});

export const facebookAuthCallbackHandler = (req, res) => {
  // Successful authentication, redirect home.

  const user = req.user;
  res.redirect(
    `http://localhost:3000/?username=${user.email}&picture=${user.image}`
  );
};

export const verifyToken = (req, res, next) => {
  //const authHeader = req.body["authorization"];
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).send({ auth: false, message: "No token provided." });

  const token = authHeader.split(" ")[1]; // Extract token
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};
