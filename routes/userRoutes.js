const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {
  COOKIE_OPTIONS,
  getToken,
  getRefreshToken,
} = require("../auth/authenticate");

router.post("/signup", (req, res, next) => {
  if (!req.body.firstName) {
    res.status(500).send({
      name: "FirstNameError",
      message: "First name required",
    });
  } else {
    User.register(new User({ username: req.body.username }));
    req.body.password,
      (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      };
  }
});

module.exports = router;
