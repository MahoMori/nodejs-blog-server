const passport = require("passport");
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  // secure: !dev,
  secure: dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
};

// lasts 15 min (JWT)
exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};

// lasts one month (refesh token)
exports.getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

exports.verifyUser = passport.authenticate("jwt", { session: false });
